import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import background from "../../assets/images/homebanner1.png";
import background_1 from "../../assets/images/homebanner2.png";
import background_2 from "../../assets/images/homebanner3.png";
import background_3 from "../../assets/images/homebanner4.png";

import "./HomeBanner.scss"

const HomeBanner = () => {
    const carouselSettings = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div>
            <Slider {...carouselSettings}>
                <div>
                    <div
                        className="banner-img"
                        style={{ backgroundImage: `url(${background})` }}>
                    </div>
                </div>
                <div>
                    <div
                        className="banner-img"
                        style={{ backgroundImage: `url(${background_1})` }}>
                    </div>
                </div>
                <div>
                    <div
                        className="banner-img"
                        style={{ backgroundImage: `url(${background_2})` }}>
                    </div>
                </div>
                <div>
                    <div
                        className="banner-img"
                        style={{ backgroundImage: `url(${background_3})` }}>
                    </div>
                </div>
            </Slider>
            <div className="bg-overlay"></div>
        </div>
    )


}

export default HomeBanner