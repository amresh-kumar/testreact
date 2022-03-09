import PropTypes from "prop-types";
import Header from "./../common/Header/Header";
import './Layout.scss'

const Layout = ({ children }) => {
    return (
        <div className="Layout">
            <Header />
            <div className="container">
                {children}
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

Layout.defaultProps = {
    children: []
};

export default Layout;