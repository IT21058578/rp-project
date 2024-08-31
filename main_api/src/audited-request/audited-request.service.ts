import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import DeviceDetector from 'node-device-detector';
import { JwtTokenService } from 'src/auth/jwt-token.service';
import { TimeBasedAnalytics } from 'src/common/dtos/time-based-analytics.dto';
import { Audience } from 'src/common/enums/audience.enum';
import { Frequency } from 'src/common/enums/frequency.enum';
import { AnalyticsUtils } from 'src/common/util/analytics.util';
import { AuditedRequest } from './audited-request.schema';

@Injectable()
export class AuditedRequestService {
  private readonly logger = new Logger(AuditedRequestService.name);
  private readonly detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
    deviceTrusted: false,
    deviceInfo: false,
    maxUserAgentSize: 500,
  });

  constructor(
    private readonly jwtTokenService: JwtTokenService,
    @InjectModel(AuditedRequest.name) private readonly auditedRequestModel: Model<AuditedRequest>,
  ) {}

  async createAuditedRequest(request: Request, response: Response) {
    const userAgent = request.headers['user-agent'];
    const authorization = request.headers['authorization'];
    if (!userAgent) {
      this.logger.warn(`Could not save request details as user-agent was falsey '${userAgent}'`);
      return;
    }

    const detectionResult = this.detector.detect(userAgent);

    let audience: string = '';
    if (authorization) {
      const token = authorization.split(' ')[1];
      const payload = await this.jwtTokenService.getPayload(token);
      if (payload.sub) {
        audience = payload.sub;
      }
    }
    return await new this.auditedRequestModel({
      createdAt: new Date(),
      audience,
      endpoint: request.baseUrl + request.path,
      origin: detectionResult,
    }).save();
  }

  async getAnalytics(
    startDate: Date,
    endDate: Date,
    frequency: Frequency,
  ): Promise<TimeBasedAnalytics<'web' | 'mobile' | 'extension'>> {
    return await AnalyticsUtils.getTimeBasedAnalytics({
      model: this.auditedRequestModel,
      options: {
        startDate,
        endDate,
        frequency,
      },
      fields: {
        web: item => item.audience === Audience.WEB_APP,
        extension: item => item.audience === Audience.EXTENSION,
        mobile: item => item.audience === Audience.MOBILE_APP,
      },
    });
  }
}
