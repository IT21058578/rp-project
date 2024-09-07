import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import PageHeaderCommon from '../../common/PageHeaderCommon';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import RecentFeedbacks from './RecentFeedbacks';

function FeedbackList() {
  return (
    <>
      <Helmet>
        <title>Feedback List</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderCommon name={'Feedback List'} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentFeedbacks />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FeedbackList;
