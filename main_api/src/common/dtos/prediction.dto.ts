import { Feedback } from 'src/feedback/feedback.schema';
import { NewsSource } from 'src/news-source/news-source.schema';
import { Prediction } from 'src/prediction/prediction.schema';
import { PredictionStatus } from '../enums/prediction-status.enum';
import { FeedbackDto } from './feedback.dto';
import { NewsSourceDto } from './news-source.dto';
import { PredictionResult } from './prediction-result.dto';
import { SearchResultDto } from './search-result.dto';

export class PredictionDto {
  text: string;
  result?: PredictionResult;
  searchResults?: SearchResultDto;
  keywords?: string[];
  status: PredictionStatus;
  sourcePredictionId?: string;
  newsSourceId?: string;
  error?: string;
  feedback?: FeedbackDto[];
  newsSource?: NewsSourceDto;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  archived?: boolean;
  sourcePrediction?: PredictionDto;

  static buildFrom(prediction: Prediction): PredictionDto {
    return {
      status: prediction.status,
      text: prediction.text,
      error: prediction.error,
      keywords: prediction.keywords,
      result: prediction.result,
      newsSourceId: prediction.newsSourceId,
      sourcePredictionId: prediction.sourcePredictionId,
      archived: prediction.archived,
      createdAt: prediction.createdAt,
      createdBy: prediction.createdBy,
      updatedAt: prediction.updatedAt,
      updatedBy: prediction.updatedBy,
    };
  }

  static buildWithAll(
    prediction: Prediction,
    feedback: Feedback[],
    newsSource?: NewsSource,
    sourcePrediction?: Prediction,
  ): PredictionDto {
    return {
      status: prediction.status,
      text: prediction.text,
      error: prediction.error,
      keywords: prediction.keywords,
      result: prediction.result,
      newsSourceId: prediction.newsSourceId,
      sourcePredictionId: prediction.sourcePredictionId,
      archived: prediction.archived,
      createdAt: prediction.createdAt,
      createdBy: prediction.createdBy,
      updatedAt: prediction.updatedAt,
      updatedBy: prediction.updatedBy,
      feedback: FeedbackDto.buildFromArray(feedback),
      newsSource: newsSource != undefined ? NewsSourceDto.buildFrom(newsSource) : undefined,
      sourcePrediction: sourcePrediction != undefined ? PredictionDto.buildFrom(sourcePrediction) : undefined,
    };
  }

  static buildFromArray(predictions: Prediction[]): PredictionDto[] {
    return predictions.map(prediction => this.buildFrom(prediction));
  }
}
