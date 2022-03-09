import { useState } from "react"
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types'

import { connect } from "react-redux"
import { reduxForm } from "redux-form"

import LabelModal from "../FilterPopups/LabelModal/LabelModal"
import GenreModal from "../FilterPopups/GenreModal/GenreModal"
import LanguageModal from "../FilterPopups/LanguageModal/LanguageModal"
import MoodModal from "../FilterPopups/MoodModal/MoodModal"
import RepertoireModal from "../FilterPopups/RepertoireModal/RepertoireModal"
import RankModal from "../FilterPopups/RankModal/RankModal"

import FontIcon from "../../common/FontIcon/FontIcon"

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import EllipsisToolTip from "ellipsis-tooltip-react-chan"


import Spotify from "../../assets/images/svg/Spotify_Logo.svg"
import "./PageFilter.scss"


let PageFilter = ({ fromDateDetails, toDateDetails, countrySelected, pageFilterForm, handleLabData, handleOrchard, handleGenData, handleLanData, handleModData, handleRepData, handleRanData, handleLabReset, handleGenReset, handleLanReset, handleModReset, handleRepReset, handleRanReset }) => {

    const CountryId = useParams().id;

    const [openlab, setOpenLab] = useState(false)
    const [opengen, setOpenGen] = useState(false)
    const [openlan, setOpenLan] = useState(false)
    const [openmod, setOpenMod] = useState(false)
    const [openrep, setOpenRep] = useState(false)
    const [openran, setOpenRan] = useState(false)

    const [labelData, setLabelData] = useState("")
    const [genreData, setGenreData] = useState("")
    const [languageData, setLanguageData] = useState("")
    const [moodData, setMoodData] = useState("")
    const [repertoireData, setRepertoireData] = useState("")
    const [rankData, setRankData] = useState("")

    const trackType = (e) => {
        if (e.target.name === "orchard") {
            handleOrchard(fromDateDetails, toDateDetails, countrySelected, labelData, repertoireData, genreData, languageData, moodData, rankData, e.target.checked)
        }
    }
    const openLabelDialog = () => {
        setOpenLab(true)
    }
    const openGenreDialog = () => {
        setOpenGen(true)
    }
    const openLanguageDialog = () => {
        setOpenLan(true)
    }
    const openMoodDialog = () => {
        setOpenMod(true)
    }
    const openRepertoireDialog = () => {
        setOpenRep(true)
    }
    const openRankDialog = () => {
        setOpenRan(true)
    }

    const closeDialog = () => {
        setOpenLab(false)
        setOpenGen(false)
        setOpenLan(false)
        setOpenMod(false)
        setOpenRep(false)
        setOpenRan(false)
    }
    const sendLabData = (data) => {
        setLabelData(data)
        setOpenLab(false)
        handleLabData(data, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, repertoireData, genreData, languageData, moodData, rankData, pageFilterForm?.values?.orchard)
    }
    const sendGenData = (data) => {
        setGenreData(data)
        setOpenGen(false)
        handleGenData(data, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, repertoireData, languageData, moodData, rankData, pageFilterForm?.values?.orchard)
    }
    const sendLanData = (data) => {
        setLanguageData(data)
        setOpenLan(false)
        handleLanData(data, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, repertoireData, genreData, moodData, rankData, pageFilterForm?.values?.orchard)
    }
    const sendModData = (data) => {
        setMoodData(data)
        setOpenMod(false)
        handleModData(data, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, repertoireData, genreData, languageData, rankData, pageFilterForm?.values?.orchard)
    }
    const sendRepData = (data) => {
        setRepertoireData(data)
        setOpenRep(false)
        handleRepData(data, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, genreData, languageData, moodData, rankData, pageFilterForm?.values?.orchard)
    }
    const sendRanData = (data) => {
        setRankData(data)
        setOpenRan(false)
        handleRanData(data, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, genreData, languageData, moodData, repertoireData, pageFilterForm?.values?.orchard)
    }

    const resetall = () => {
        setLabelData("")
        setGenreData("")
        setLanguageData("")
        setMoodData("")
        setRepertoireData("")
        setRankData("")
    }

    const resetLabel = () => {
        setOpenLab(false)
        setLabelData("")
        handleLabReset(null, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, genreData, languageData, moodData, repertoireData, rankData, pageFilterForm?.values?.orchard)
    }
    const resetGenre = () => {
        setOpenGen(false)
        setGenreData("")
        handleGenReset(null, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, languageData, moodData, repertoireData, rankData, pageFilterForm?.values?.orchard)
    }
    const resetLanguage = () => {
        setOpenLan(false)
        setLanguageData("")
        handleLanReset(null, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, genreData, moodData, repertoireData, rankData, pageFilterForm?.values?.orchard)
    }
    const resetMood = () => {
        setOpenMod(false)
        setMoodData("")
        handleModReset(null, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, genreData, languageData, repertoireData, rankData, pageFilterForm?.values?.orchard)
    }
    const resetRepertoire = () => {
        setOpenRep(false)
        setRepertoireData("")
        handleRepReset(null, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, genreData, languageData, moodData, rankData, pageFilterForm?.values?.orchard)

    }
    const resetRank = () => {
        setOpenRan(false)
        setRankData("")
        handleRanReset(null, fromDateDetails, toDateDetails, CountryId ? CountryId : countrySelected, labelData, genreData, languageData, moodData, repertoireData, pageFilterForm?.values?.orchard)
    }

    const options = {
        effect: "solid",
        place: "top"
    }

    return (
        <div>
            <div className="page-filter">
                <div className="dsp">
                    <span>DSP</span>
                    <div className="spotify-logo">
                        <img src={Spotify} alt="Spotify_logo" />
                    </div>
                    <FontIcon
                        iconName="down_arrow"
                        color="grey"
                    />
                </div>
                <div className="filter-wrapper">
                    <div>
                        <div className="filter-row">
                            <div className="filter-dropdown" onClick={openLabelDialog} role="presentation">
                                <EllipsisToolTip className="title" options={options}>{labelData ? labelData : "Label"}</EllipsisToolTip>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                            <LabelModal open={openlab === true} handleClose={closeDialog} sendLabData={sendLabData} resetLabel={resetLabel} resetall={resetall} />
                            <div className="filter-dropdown" onClick={openRepertoireDialog} role="presentation">
                                <EllipsisToolTip className="title" options={options}>{repertoireData ? repertoireData : "Repertoire"}</EllipsisToolTip>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                            <RepertoireModal open={openrep === true} handleClose={closeDialog} sendRepData={sendRepData} resetRepertoire={resetRepertoire} />
                            <div className="filter-dropdown" onClick={openGenreDialog} role="presentation">
                                <EllipsisToolTip className="title" options={options}>{genreData ? genreData : "Genre"}</EllipsisToolTip>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                            <GenreModal open={opengen === true} handleClose={closeDialog} sendGenData={sendGenData} resetGenre={resetGenre} />
                        </div>
                        <div className="filter-row">
                            <div className="filter-dropdown" onClick={openLanguageDialog} role="presentation">
                                <EllipsisToolTip className="title" options={options}>{languageData ? languageData : "Language"}</EllipsisToolTip>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                            <LanguageModal open={openlan === true} handleClose={closeDialog} sendLanData={sendLanData} resetLanguage={resetLanguage} />
                            <div className="filter-dropdown" onClick={openMoodDialog} role="presentation">
                                <EllipsisToolTip className="title" options={options}>{moodData ? moodData : "Mood"}</EllipsisToolTip>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                            <MoodModal open={openmod === true} handleClose={closeDialog} sendModData={sendModData} resetMood={resetMood} />
                            <div className="filter-dropdown" onClick={openRankDialog} role="presentation">
                                <EllipsisToolTip className="title" options={options}>{rankData ? rankData : "Rank"}</EllipsisToolTip>
                                <FontIcon
                                    iconName="down_arrow"
                                />
                            </div>
                            <RankModal open={openran === true} handleClose={closeDialog} sendRanData={sendRanData} resetRank={resetRank} />
                        </div>
                    </div>
                    <div className="orchard-check">
                        <FormControlLabel control={<Checkbox defaultChecked name="orchard" onChange={trackType} />} label="Include Orchard" />
                    </div>
                </div>
            </div>
        </div>
    )
}
PageFilter.propTypes = {
    fromDateDetails: PropTypes.string,
    toDateDetails: PropTypes.string,
    countrySelected: PropTypes.string,
    pageFilterForm: PropTypes.object,

    handleLabData: PropTypes.func,
    handleOrchard: PropTypes.func,
    handleGenData: PropTypes.func,
    handleLanData: PropTypes.func,
    handleModData: PropTypes.func,
    handleRepData: PropTypes.func,
    handleRanData: PropTypes.func,
    handleLabReset: PropTypes.func,
    handleGenReset: PropTypes.func,
    handleLanReset: PropTypes.func,
    handleModReset: PropTypes.func,
    handleRepReset: PropTypes.func,
    handleRanReset: PropTypes.func,

}

PageFilter.defaultProps = {
    fromDateDetails: "",
    toDateDetails: "",
    countrySelected: "",
    pageFilterForm: {},

    handleLabData: () => { },
    handleOrchard: () => { },
    handleGenData: () => { },
    handleLanData: () => { },
    handleModData: () => { },
    handleRepData: () => { },
    handleRanData: () => { },
    handleLabReset: () => { },
    handleGenReset: () => { },
    handleLanReset: () => { },
    handleModReset: () => { },
    handleRepReset: () => { },
    handleRanReset: () => { },

}
const mapDispatchToProps = {
}

const mapStateToProps = ({ Home, form, Common }) => {
    const { fromDateDetails, toDateDetails } = Common
    const { countrySelected } = Home
    const { pageFilterForm } = form

    return { fromDateDetails, toDateDetails, countrySelected, pageFilterForm }
}

PageFilter = reduxForm({
    form: "pageFilterForm",
    enableReinitialize: true
})(PageFilter)

export default connect(mapStateToProps, mapDispatchToProps)(PageFilter);
