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
        <Typography variant="h6" gutterBottom>
          {'Privacy Policy of M3E Helper'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'M3E Helper operates the https://m3e.nazwa.pl website, which provides the SERVICE.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the M3E Helper website.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at https://m3e.nazwa.pl, unless otherwise defined in this Privacy Policy. Our Privacy Policy was created with the help of the Privacy Policy Template.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Information Collection and Use'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name and email address. The information that we collect will be used to contact or identify you.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Log Data'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Security'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Links to Other Sites'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Children’s Privacy'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.'}
        </Typography>
        <Typography variant="subtitle2" gutterBottom align="justify">
          {'Changes to This Privacy Policy'}
        </Typography>
        <Typography gutterBottom align="justify">
          {'We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.'}
        </Typography>
        <Typography variant="h6" gutterBottom>
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
