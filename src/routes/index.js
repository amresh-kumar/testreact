import {
    HashRouter as Router,
    Switch,
    Route, Redirect, useLocation
} from "react-router-dom";
import { useEffect } from 'react';
import Layout from "./Layout";
import HomePage from "../containers/HomePage";
import TracksPage from "../containers/TracksPage";
import ChartSummaryPage from "../containers/ChartSummaryPage";
import MarketSharePage from "../containers/MarketSharePage";
import BenchMarkPage from "../containers/BenchMarkPage";
import ArtistsPage from "../containers/ArtistsPage";
import GenrePage from "../containers/GenrePage";
import ChartComparisonPage from "../containers/ChartComparisonPage";
import TrackDetailsPage from "../containers/TrackDetailsPage";
import CompetitiveComparisionPage from "../containers/CompetitiveComparisionPage";
import ArtistDetailsPage from "../containers/ArtistDetailsPage";
import CityChartComparison from "../components/CityChartComparison/CityChartComparison";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Layout>
                    <ScrollToTop />
                    <Route path="/home" exact component={HomePage} />
                    <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
                    <Route path="/tracks" exact component={TracksPage} />
                    <Route path="/chartsummary" exact component={ChartSummaryPage} />
                    <Route path="/chartcomparison" exact component={ChartComparisonPage} />
                    <Route path="/citychartcomparison/:country/:id" exact component={CityChartComparison} />
                    <Route path="/marketshare" exact component={MarketSharePage} />
                    <Route path="/benchmark" exact component={BenchMarkPage} />
                    <Route path="/genre" exact component={GenrePage} />
                    <Route path="/artists" exact component={ArtistsPage} />
                    <Route path="/competitivecomparision" exact component={CompetitiveComparisionPage} />
                    <Route path="/trackdetails/:id/:date" exact component={TrackDetailsPage} />
                    <Route path="/artistdetails/:name" exact component={ArtistDetailsPage} />
                </Layout>
            </Switch>
        </Router>
    );
}

export default AppRoutes;
