import SonyFooterLogo from "../../assets/images/svg/sonymusic_text.svg";

import "./Footer.scss"

const Footer = () => {
    return (
        <div>
            <div className="footer">
                <div className="footer-logo">
                    <img src={SonyFooterLogo} alt="Sony_logo" />
                </div>
                <div className="copyright">Copyright © 2022 <span>Sony Music Entertainment</span></div>
            </div>
        </div>
    )
}

export default Footer
