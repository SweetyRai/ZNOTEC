import React from 'react';
import Navbar from '../Navbar/Navbar';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-wrapper">
      <Navbar className="policy-navbar" />
      <div className="privacy-container">
        <div className="privacy-content">
          <div className="privacy-section">
            <div className="privacy-title">Privacy Policy</div>
            <p>Introduction and general information<br/>
            Thank you for your interest in our website. The protection of your personal data is very important to us...</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Controller within the meaning of the GDPR</div>
            <p>ZNOTEC GmbH<br/>
            Pichelsdorferstr. 61, 13595 Berlin<br/>
            Telephone number<br/>
            e-mail</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Contact details of the data protection officer</div>
            <p>Proliance GmbH / www.datenschutzexperte.de<br/>
            Data Protection Officer<br/>
            Leopoldstrasse 21<br/>
            80802 Munich<br/>
            datenschutzberater@datenschutzexperte.de</p>
          </div>

          {/* You can continue adding other sections here similarly */}

          <div className="privacy-section">
            <div className="privacy-title">Definitions</div>
            <p>Our privacy policy is intended to be simple and understandable for everyone. This privacy policy generally uses the official terms of the General Data Protection Regulation (GDPR)</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Access to and storage of information in terminal equipment</div>
            <p>By using our website, information (e.g., IP address) may be accessed or stored (e.g., cookies) on your device. This access or storage may involve further processing of personal data within the meaning of the GDPR.
In cases where such access to information or such storage of information is absolutely necessary for the technically error-free provision of our services, this is done on the basis of Section 25 Paragraph 1 Sentence 1, Paragraph 2 No. 2 TDDDG.
In cases where such a process serves other purposes (e.g., tailoring our website to meet your needs), this will only take place on the basis of Section 25 (1) of the Telemedia Act (TDDDG) with your consent in accordance with Article 6 (1) (a) of the GDPR. This consent can be revoked at any time for the future. The provisions of the GDPR and the Federal Data Protection Act (BDSG) apply to the processing of your personal data.
Further information on the processing of your personal data and the relevant legal bases in this context can be found in the following sections on the specific processing activities on our website.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Web hosting</div>
            <p>This website is hosted by an external service provider (hoster). This website is hosted in Germany by all-inkl.com. Personal data collected on this website is stored on the hoster's servers. This may include, in particular, IP addresses, contact requests, meta and communication data, website access, and other data generated via a website.
We collect the listed data to ensure a smooth connection to the website and the technically error-free provision of our services. The processing of this data is absolutely necessary to make the website available to you. The legal basis for processing this data is our legitimate interest in the correct presentation and functionality of our website in accordance with Art. 6 (1) (f) GDPR.
We have concluded a data processing agreement with the provider in accordance with the requirements of Art. 28 GDPR, in which we oblige the provider to protect our customers' data and not to pass it on to third parties.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Server log files</div>
            <p>When you visit our website, it is technically necessary for data to be transmitted to our web server via your internet browser. The following data is recorded during an ongoing connection for communication between your internet browser and our web server:</p>
            <ul>
                <li>Date and time of the request</li>
                <li>Name of the requested file</li>
                <li>Page from which the file was requested</li>
                <li>Access status</li>
                <li>Web browser and operating system used</li>
                <li>(Full) IP address of the requesting computer</li>
                <li>Amount of data transferred</li>
            </ul>
            <p>We collect the listed data to ensure a smooth connection to the website and the technically error-free provision of our services. Processing this data is absolutely necessary to make the website available to you. The log files are used to evaluate system security and stability, as well as for administrative purposes. The legal basis for processing this data is our legitimate interest in the protection and functionality of our website in accordance with Art. 6 (1) (f) GDPR.</p>
            <p>For reasons of technical security, particularly to prevent attacks on our web server, we store this data for a short time. After XX days at the latestThe data is anonymized by shortening the IP address at domain level, so that it is no longer possible to establish a reference to the individual user.</p>
            <p>In anonymized form, the data may also be processed for statistical purposes. This data will never be stored together with other personal data of the user, compared with other databases, or shared with third parties.</p>

          </div>
          <div className="privacy-section">
            <div className="privacy-title">Contact form and contact via email</div>
            <p>If you send us inquiries via the contact form or email, the information you provide in the form or email, including the personal data you provide there, will be stored by us to process your inquiry and in case of follow-up questions. Providing an email address is required to contact you; providing your first and last name and telephone number is voluntary.We will never share this data without your consent. The legal basis for processing this data is our legitimate interest in responding to your request in accordance with Art. 6 (1) (f) GDPR and, where applicable, Art. 6 (1) (b) GDPR, provided your request is aimed at concluding a contract. Your data will be deleted after your request has been processed, unless there are statutory retention periods. In the case of Art. 6 (1) (f) GDPR, you can object to the processing of your personal data at any time.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">registration</div>
            <p>You have the option of registering for certain services provided on our website and thereby creating a user profile. During the registration and setup process, we collect and use the following personal data:</p>
            <ul>
                <li>First and last name and title</li>
                <li>E-mail address</li>
                <li>Date and time of registration</li>
            </ul>
            <p>In addition, voluntary information can be provided (e.g. telephone number, etc.).). Mandatory information provided for the purpose of registration is marked as a mandatory field in the input mask with an asterisk. With your user account, you can use other parts of our website and log in to the offers you have purchased. The legal basis for data processing is Art. 6 (1) (a) GDPR or Art. 6 (1) (b) GDPR, provided that the processing is necessary to provide the desired services. Your data will be deleted as soon as the user account on our website is deleted and provided that there are no statutory retention periods. You can usually change and/or delete your user account, including the data you have provided, directly in your user account after logging in or you can request this by sending a corresponding message to the person responsible named above.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Sending applications</div>
            <p>If you apply to us via our contact form or by email, we collect personal data. This includes, in particular, your contact details (such as your first and last name, telephone number, and email address) as well as other information you provide about your career (e.g., your CV, qualifications, degrees, and professional experience) and your personal details (e.g., cover letter, personal interests). This may also include special categories of personal data (e.g., information about a severe disability).</p>
            <p>Your personal data is generally collected directly from you as part of the application process and encrypted during electronic transmission. The primary legal basis for this is Section 26 (1) of the German Federal Data Protection Act (BDSG). In addition, consents pursuant to Article 6 (1) (a) GDPR in conjunction with Section 26 (2) BDSG can be used as a data protection authorization requirement. If the processing of your data is based on consent, you have the right to revoke this consent at any time with future effect.</p>
            <p>Within our company, only those individuals and departments (e.g., human resources) who absolutely need your personal data to conduct the application process or fulfill our legal obligations have access to your personal data. Your applications will be forwarded to the appropriate person for review if necessary. Under no circumstances will your personal data be shared with unauthorized third parties.</p>
            <p>Your data relating to an application for a specific job opening will be stored and processed by us during the ongoing application process. After the application process is completed (e.g., in the form of an acceptance or rejection), the application process, including all personal data, will be deleted from the system no later than six months after the end of the application process. The data of selected applicants will be securely stored for up to one year, provided the applicants have given their consent in accordance with Art. 6 (1) (a) GDPR in conjunction with Section 26 (2) BDSG.You can revoke your consent at any time with future effect. To do so, simply send an informal email to the contact details listed above. If you are accepted, your application documents will be added to your personnel file.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Web form for requesting a quote</div>
            <p>Our website provides a web form through which you can contact us to receive a free quote for our services via
E-mail and telephone. The transmission of personal data via the
Web forms are encrypted only. Please take advantage of this option,
The data entered in the input mask will be transmitted to us and stored.</p>
            <p>These data are:</p>
            <ul>
                <li>First name</li>
                <li>Last name</li>
                <li>E-mail address</li>
                <li>(optional) Telephone number</li>
                <li>(optional) Company name if required for feedback.</li>
            </ul>
            <p>We also record the date and time of your inquiry. In this context, no data will be passed on to third parties. The data will be processed exclusively for the stated purpose – to send an offer and to contact you by telephone. The legal basis for processing the data transmitted in the course of sending an email is the implementation of pre-contractual measures or a contract in accordance with Art. 6 (1) (b) GDPR.</p>
            <p>The personal data collected for the purpose of obtaining an offer will be deleted as soon as the offer has been sent and a timely contact with you
has taken place or was unsuccessful. Continued processing will only take place if
these in the context of the resulting initiation and execution of a contract or
is necessary to fulfil the resulting contractual purposes.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Newsletter</div>
            <p>If you would like to receive the newsletter offered on the website with regular information about our offers and products, we require your email address as mandatory information.</p>
            <p>Additional data may be provided in order to be able to address you personally in the newsletter and/or to identify you if you wish to exercise your rights as a data subject.</p>
            <p>We use the so-called double opt-in procedure to send our newsletter. This means that we will only send you our newsletter by email after you have expressly confirmed that you consent to receiving newsletters. As a first step, you will receive an email with a link that you can use to confirm that you, as the owner of the corresponding email address, wish to receive future newsletters. By confirming this, you give us your consent in accordance with Art. 6 (1) (a) GDPR to use your personal data for the purpose of sending the desired newsletter.</p>
            <p>When you register for the newsletter, we store the email address required for delivery, the IP address you used to register for the newsletter, and the date and time of registration and confirmation, in order to be able to trace any possible misuse at a later date. The legal basis for this is our legitimate interest pursuant to Art. 6 (1) (f) GDPR.</p>
            <p>You can unsubscribe from the newsletter at any time using the link included in each newsletter or by sending an email to the person responsible named above. After unsubscribing, your email address will be immediately deleted from our newsletter distribution list unless you have expressly consented to the continued use of the collected data or the continued processing is otherwise permitted by law.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Cookies</div>
            <p>Our website uses so-called "cookies." Cookies are small text files that are stored on your device either temporarily for the duration of a session (session cookies) or permanently (permanent cookies). Session cookies are automatically deleted after your visit. Permanent cookies remain stored on your device until you delete them yourself or your web browser automatically deletes them.</p>
            <p>Cookies serve various functions. Many cookies are technically necessary, as certain website features would not work without them (e.g., the shopping cart function or language settings). Other cookies are used to evaluate user behavior or display advertising.</p>
            <p>The processing of data through the use of strictly necessary cookies is based on a legitimate interest pursuant to Art. 6 (1) (f) GDPR in the technically error-free provision of our services. For details on the processing purposes and legitimate interests, please refer to the explanations on the specific data processing operations.</p>
            <p>The processing of personal data through the use of other cookies is based on consent in accordance with Art. 6 (1) (a) GDPR. This consent can be revoked at any time for the future. If such cookies are used for analysis and optimization purposes, we will inform you separately within the framework of this privacy policy and obtain your consent in accordance with Art. 6 (1) (a) GDPR.</p>
            <p>You can set your browser so that you</p>
            <ul>
                <li>be informed about the setting of cookies,</li>
                <li>Allow cookies only in individual cases,</li>
                <li>exclude the acceptance of cookies for certain cases or in general,</li>
                <li>Activate the automatic deletion of cookies when closing the browser.</li>
            </ul>
            <p>Cookie settings can be managed for each browser using the following links:</p>
            <ul>
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Edge (Microsoft)</li>
                <li>safari</li>
                <li>Opera</li>
            </ul>
            <p>You can also manage cookies from many companies and features used for advertising individually using the relevant user tools available at https://www.aboutads.info/choices/ or http://www.youronlinechoices.com/uk/your-ad-choices.</p>
            <p>Most browsers also offer a so-called "do-not-track" feature. When enabled, this feature informs advertising networks, websites, and applications that you do not want to be tracked for behavioral advertising and similar purposes.</p>
            <p>Information and instructions on how to edit this function can be found under the following links, depending on your browser provider:</p>
            <ul>
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Edge (Microsoft)</li>
                <li>safari</li>
                <li>Opera</li>
            </ul>
            <p>Additionally, you can prevent the loading of so-called scripts by default. "NoScript" allows JavaScript, Java, and other plug-ins to run only on trusted domains of your choice. Information and instructions on how to configure this feature are available from your browser provider (e.g., for Mozilla Firefox, see: https://addons.mozilla.org/de/firefox/addon/noscript/).</p>
            <p>Please note that deactivating cookies may limit the functionality of our website.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Google Analytics </div>
            <p>Our website uses Google Analytics, an internet analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland ("Google"). Google Analytics uses so-called "cookies."</p>
            <p>Google will use this information on behalf of the operator of this website to evaluate your use of the website and to compile reports on website activity. Google will also use this information to provide the website operator with other services relating to website and internet usage.YourThe IP address sent by your browser as part of Google Analytics will not be combined with other Google data. Processing is carried out in accordance with Art. 6 (1) (a) GDPR on the basis of your consent.</p>
            <p>We only use Google Analytics with activated IP anonymization. This means that your IP address will only be processed by Google in a shortened form.</p>
            <p>We have concluded a data processing agreement with the service provider in which we oblige them to protect our customers' data and not to pass it on to third parties.</p>
            <p>Since Google may transfer personal data to affiliated companies and subcontractors in countries outside the EU and EEA, additional safeguards are required to ensure the level of data protection required by the GDPR. For the USA, the EU Commission has issued an adequacy decision pursuant to Art. 45 (1) GDPR regarding companies certified under the EU-US Data Privacy Framework. Google LLC is certified under the EU-US Data Privacy Framework and is therefore committed to adhering to appropriate data protection standards, which can be viewed at the following link: https://www.dataprivacyframework.gov/s/participant-search 
            For potential transfers to other third countries outside the EU and the EEA for which no adequacy decision has been made by the EU Commission, we have also agreed standard data protection clauses with the provider in accordance with Art. 46 (2) (c) GDPR. These oblige the recipient of the data in the third country to process the data in accordance with the level of protection in Europe.</p>
            <p>The Google Analytics terms of use and privacy information can be accessed via the following links:</p>
            <p>http://www.google.com/analytics/terms/de.html </p>
            <p>https://www.google.de/intl/de/policies/</p>
            <p>The data will be deleted as soon as it is no longer required to achieve the purpose for which it was collected. User- and event-level data linked to cookies, user identifiers (e.g., user ID), and advertising IDs (e.g., DoubleClick cookies, Android advertising ID, IDFA [Apple identifier for advertisers]) will be deleted no later than 14 months after collection.</p>
            <p>You can prevent cookies from being saved by adjusting your browser software settings accordingly. However, please note that if you do this, you may not be able to use all the features of this website without restrictions. You can also prevent Google from collecting the data generated by the cookie and analyzing your use of the website (including your IP address) and processing this data by Google by downloading and installing the browser plug-in available athttps://tools.google.com/dlpage/gaoptout?hl=deis available.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Google Maps</div>
            <p>Our website uses an interface from the online map service provider Google Maps. This allows us to display interactive maps directly on the website and enable you to conveniently use the map function. The provider of this map service is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. To use the features of Google Maps, it is necessary to save your IP address.</p>
            <p>Google uses cookies to collect information about user behavior. The legal basis for the processing of your personal data is your consent pursuant to Art. 6 (1) (a) GDPR, Section 25 (1)TDDDG.</p>
            <p>Since Google may transfer personal data to affiliated companies and subcontractors in countries outside the EU and EEA, additional safeguards are required to ensure the level of data protection required by the GDPR. For the USA, the EU Commission has issued an adequacy decision pursuant to Art. 45 (1) GDPR regarding companies certified under the EU-US Data Privacy Framework. Google LLC is certified under the EU-US Data Privacy Framework and is therefore committed to adhering to appropriate data protection standards, which can be viewed at the following link:https://www.dataprivacyframework.gov/s/participant-search 
            For potential transfers to other third countries outside the EU and the EEA for which no adequacy decision has been made by the EU Commission, we have also agreed standard data protection clauses with the provider in accordance with Art. 46 (2) (c) GDPR. These oblige the recipient of the data in the third country to process the data in accordance with the level of protection in Europe.</p>
            <p>For more information on how user data is handled, please see Google’s privacy policy: 
            https://www.google.de/intl/de/policies/privacy/</p>
            <p>Opt out: https://www.google.com/settings/ads/</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Change cookie settings</div>
            <p>You can revoke or change your cookie settings at any time. To do so, access the cookie settings again using our integrated thumbprint. You can find this at any time in the bottom left corner of the website.</p>
            <p>or</p>
            <p>You can revoke or change your cookie settings at any time. To do so, access the cookie settings again via this link (embed hyperlink to cookie settings).</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">External links</div>
            <p>Social networks (PLEASE SPECIFY)are integrated into our website merely as links to the corresponding services. After clicking on the embedded text/image link, you will be redirected to the respective provider's website. User information is only transferred to the respective provider after redirection. For information on how your personal data is handled when using these websites, please refer to the respective privacy policies of the providers you use.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Data transfer and recipients</div>
            <p>Our privacy policy is intended to be simple and understandable for everyone. This privacy policy generally uses the official terms of the General Data Protection Regulation (GDPR)</p>
            <p>Your personal data will not be transferred to third parties, unless</p>
            <ul>
                <li>if we have explicitly pointed this out in the description of the respective data processing,</li>
                <li>if you have given your express consent in accordance with Art. 6 (1) (a) GDPR,</li>
                <li>the transfer according to Art. 6 para.1 S. 1 lit. f GDPR is necessary to assert, exercise or defend legal claims and there is no reason to assume that you have an overriding legitimate interest in not disclosing your data,</li>
                <li>in the event that the transfer is necessary in accordance with Art. 6 para.1 S. 1 lit. c GDPR there is a legal obligation and</li>
                <li>as far as this is permitted under Article 6 paragraph1 S. 1 lit. b GDPR is necessary for the processing of contractual relationships with you.</li>
            </ul>
            <p>We also use external service providers to handle our services. These service providers are carefully selected, commissioned in writing, and, where necessary, have concluded data processing agreements in accordance with Art. 28 GDPR. These service providers are bound by our instructions and are regularly monitored by us. These include service providers for hosting, sending emails, and maintaining and servicing our IT systems, among others. The service providers will not share this data with third parties.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Data security</div>
            <p>In accordance with Art. 32 GDPR, we take appropriate technical and organizational measures to ensure a level of protection appropriate to the risk, taking into account the state of the art, the implementation costs, and the nature, scope, circumstances, and purposes of processing, as well as the varying likelihood and severity of the risk to the rights and freedoms of natural persons. This website uses SSL encryption for security reasons and to protect the transmission of confidential content.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Duration of storage of personal data</div>
            <p>The duration of storage of personal data is determined by the relevant statutory retention periods (e.g., under commercial law and tax law). After expiration of the respective retention period, the corresponding data is routinely deleted. If data is required to fulfill or initiate a contract, or if we have a legitimate interest in continuing to store it, the data will be deleted when it is no longer required for these purposes or when you have exercised your right of withdrawal or objection.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Your rights</div>
            <p>Below you will find information on the rights granted to you by applicable data protection law vis-à-vis the controller with regard to the processing of your personal data:</p>
            <p>The right to request information about your personal data processed by us in accordance with Art. 15 GDPR. In particular, you can request information about the processing purposes, the category of personal data, the categories of recipients to whom your data has been or will be disclosed, the planned storage period, the existence of a right to rectification, erasure, restriction of processing or objection, the existence of a right to lodge a complaint, the origin of your data if it was not collected from us, as well as the existence of automated decision-making, including profiling, and, if applicable, meaningful information on its details.</p>
            <p>The right to request the immediate correction of inaccurate or incomplete personal data stored by us in accordance with Art. 16 GDPR.</p>
            <p>The right to request the deletion of your personal data stored by us in accordance with Art. 17 GDPR, unless processing is necessary to exercise the right to freedom of expression and information, to fulfill a legal obligation, for reasons of public interest or to assert, exercise or defend legal claims.</p>
            <p>The right to request the restriction of the processing of your personal data in accordance with Art. 18 GDPR if you contest the accuracy of the data, the processing is unlawful but you refuse to delete it and we no longer need the data, but you need it to assert, exercise or defend legal claims or you have objected to the processing in accordance with Art. 21 GDPR.</p>
            <p>The right, in accordance with Art. 20 GDPR, to receive your personal data that you have provided to us in a structured, common and machine-readable format or to request that it be transmitted to another controller.</p>
            <p>The right to lodge a complaint with a supervisory authority pursuant to Art. 77 GDPR. As a rule, you can contact the supervisory authority of the federal state in which we are headquartered, or, if applicable, the supervisory authority of your usual place of residence or work.</p>
            <p>The right to revoke consent granted pursuant to Art. 7 (3) GDPR: You have the right to revoke your consent to the processing of data at any time with future effect. In the event of revocation, we will delete the affected data immediately.</p>
            <p>Unless further processing can be based on a legal basis for processing without consent. The revocation of consent does not affect the legality of the processing carried out on the basis of the consent up to the time of revocation.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Right of objection</div>
            <p>If your personal data is processed by us on the basis of legitimate interests pursuant to Art. 6 (1) (f) GDPR, you have the right to object to the processing of your personal data pursuant to Art. 21 GDPR, provided this is done for reasons arising from your particular situation. If the objection is directed against the processing of personal data for the purposes of direct marketing, you have a general right of objection without the need to state a particular situation.</p>
            <p>If you wish to exercise your right of withdrawal or objection, simply send an email to info@znotec.com</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Legal obligations</div>
            <p>The provision of personal data for the purpose of deciding whether to conclude or fulfill a contract, or for taking pre-contractual measures, is voluntary. However, we can only make decisions within the scope of contractual measures if you provide personal data that is necessary for the conclusion or fulfillment of the contract, or for taking pre-contractual measures.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Automated decision-making</div>
            <p>Automated decision-making or profiling pursuant to Art. 22 GDPR does not take place.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Subject to change</div>
            <p>We reserve the right to adapt or update this privacy policy as necessary, in compliance with applicable data protection regulations. This allows us to adapt it to current legal requirements and to take into account changes to our services, for example, when introducing new services. The most recent version applies to your visit.</p>
          </div>

          <p>Status of this privacy policy: DD.MM.YYYY</p>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
