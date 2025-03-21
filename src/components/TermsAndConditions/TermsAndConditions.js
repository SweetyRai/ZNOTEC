import React from 'react';
import Navbar from '../Navbar/Navbar';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (

        
        <div className="privacy-wrapper">
        <Navbar className="terms-navbar" />
      <div className="privacy-container">
        <div className="privacy-content">
          <div className="privacy-section">
            <div className="privacy-title">General Terms and Conditions (GTC) of ZNOTEC GmbH</div>
            <p>These General Terms and Conditions (GTC) apply to all contracts between ZNOTEC GmbH (hereinafter "ZNOTEC") and its customers regarding the provision of IT services, particularly in the area of SAP consulting. Deviating, opposing, or supplementary conditions of the customer will only become part of the contract if ZNOTEC has expressly agreed to their validity in writing.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Services and Conclusion of Contract</div>
            <p>(1) ZNOTEC provides IT services, particularly consulting, implementation, evaluation, and support for SAP systems. The exact scope of services results from the respective contract.(2) Offers from ZNOTEC are non-binding and subject to change. A contract is only concluded through written confirmation from ZNOTEC or by the provision of the service.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Customer's Obligations to Cooperate</div>
            <p>(1) The customer ensures that all necessary cooperation services for the fulfillment of the contract are provided in a timely and free of charge.(2) Delays due to the customer's lack of cooperation release ZNOTEC from agreed performance deadlines and may lead to additional costs.</p>
          </div>

          {/* You can continue adding other sections here similarly */}

          <div className="privacy-section">
            <div className="privacy-title">Compensation and Payment Terms</div>
            <p>(1) The compensation is based on the respective contract and, unless otherwise agreed, is payable within 14 days after invoicing without deduction.(2) All prices are exclusive of statutory value-added tax.(3) In the event of payment delay, ZNOTEC is entitled to charge default interest at the statutory rate.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Liability and Warranty</div>
            <p>(1) ZNOTEC is only liable for intent and gross negligence. For simple negligence, ZNOTEC is only liable in the event of a breach of essential contractual obligations (cardinal obligations), whereby liability in this case is limited to typical, foreseeable damages.(2) Liability for lost profits, indirect damages, or consequential damages is excluded.(3) Claims for warranty expire within 12 months after the provision of the service.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Confidentiality and Data Protection</div>
            <p>(1) Both parties commit to not disclose confidential information of the respective other party to third parties or to use it for purposes other than those contractually agreed.(2) ZNOTEC processes personal data of the customer in compliance with applicable data protection regulations. Further information is regulated in ZNOTEC's privacy policy.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Contract Duration and Termination</div>
            <p>(1) The contract duration is based on the respective agreement.(2) Terminations must be in writing.(3) The right to terminate without notice for important reasons remains unaffected.</p>
          </div>

          <div className="privacy-section">
            <div className="privacy-title">Final Provisions</div>
            <p>(1) The law of the Federal Republic of Germany applies, excluding the UN Sales Convention.(2) The place of jurisdiction for all disputes is, unless legally permissible, the registered office of ZNOTEC.(3) Should individual provisions of these GTC be or become ineffective, the effectiveness of the remaining provisions shall remain unaffected.</p>
          </div>

          <p>Status: March 2025.</p>

        </div>
      </div>
    </div>
 
    
  );
};

export default TermsAndConditions;
