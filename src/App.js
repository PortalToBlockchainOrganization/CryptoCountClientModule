import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { devToolsEnhancer } from "redux-devtools-extension";
import Button from "./components/Button/Button";


function mapStateToProps(state) {
	return {
		user: state.user,
		params: {
			address: state.params.address,
			basisDate: state.params.basisDate,
			fiat: state.params.fiat,
		},
		Errs: state.Errs,
		cal: state.cal,
		set: state.set,
		realizedHistory: state.realizedHistory,
	};
}


const App = withRouter(connect(mapStateToProps)(Button));

export default App;
