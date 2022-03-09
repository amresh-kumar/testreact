import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AritistThumbnail from "../../assets/images/aritistthumbnail1.png";
import AritistThumbnail1 from "../../assets/images/aritistthumbnail2.png";
import AritistThumbnail2 from "../../assets/images/aritistthumbnail3.png";
import AritistThumbnail3 from "../../assets/images/aritistthumbnail4.png";
import AritistThumbnail4 from "../../assets/images/aritistthumbnail5.png";
import AritistThumbnail5 from "../../assets/images/aritistthumbnail6.png";
import AritistThumbnail6 from "../../assets/images/aritistthumbnail7.png";
import AritistThumbnail7 from "../../assets/images/aritistthumbnail8.png";
import AritistThumbnail8 from "../../assets/images/aritistthumbnail9.png";

import background from "../../assets/images/MediumBanner_bg1.png";
import background_1 from "../../assets/images/MediumBanner_bg2.png";
import background_2 from "../../assets/images/MediumBanner_bg3.png";
import background_3 from "../../assets/images/MediumBanner_bg4.png";
import background_4 from "../../assets/images/MediumBanner_bg5.png";
import background_5 from "../../assets/images/MediumBanner_bg6.png";
import background_6 from "../../assets/images/MediumBanner_bg7.png";
import background_7 from "../../assets/images/MediumBanner_bg8.png";
import background_8 from "../../assets/images/MediumBanner_bg9.png";

import "./PageBanner.scss"

const PageBanner = () => {
    const carouselSettings = {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <Slider {...carouselSettings}>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_1})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail1} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_2})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail2} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_3})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail3} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_4})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail4} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_5})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail5} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_6})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail6} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_7})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail7} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="carousel-wrapper" style={{ backgroundImage: `url(${background_8})` }}>
                        <div className="carousel-details">
                            <div className="img-block" >
                                <img src={AritistThumbnail8} alt="Aritist-Thumbnail" />
                            </div>
                            <div className="heading-block">
                                <div >Believer by imagine Dragons has been on top </div>
                                <div>Songs India the longest, at 141 weeks straight</div>
                                <div className="year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </>
    )
}

export default PageBanner