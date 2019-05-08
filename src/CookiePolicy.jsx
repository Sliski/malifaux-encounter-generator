import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './styles.jsx';

class CookiePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography variant="h6" gutterBottom>
          {'Cookie Policy for M3E Helper'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'This is the Cookie Policy for M3E Helper, accessible from https://m3e.nazwa.pl'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'What Are Cookies'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or \'break\' certain elements of the sites functionality. For more general information on cookies see the Wikipedia article on HTTP Cookies.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'How We Use Cookies'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Disabling Cookies'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'The Cookies We Set'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'Login related cookies: We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'Forms related cookies: When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'Site preferences cookies: In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Third Party Cookies'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'More Information'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren\'t sure whether you need or not it\'s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the Generator '}
          <a href="https://cookiepolicygenerator.com">
            {'GDPR Cookies Policy Template'}
          </a>
          {' and the '}
          <a href="https://cookiespolicytemplate.com/">
            {'GDPR Cookies Policy Template'}
          </a>
          {' based on the '}
          <a href="https://termsfeed.com/privacy-policy/generator/">
            {'Privacy Policy Generator from TermsFeed'}
          </a>
          {'.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'However if you are still looking for more information then you can contact us By visiting this link: '}
          <a href="/contact">https://m3e.nazwa.pl/contact</a>
          {'.'}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(CookiePolicy);
