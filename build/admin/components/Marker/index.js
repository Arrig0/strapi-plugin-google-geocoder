"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const K_WIDTH = 15;
const K_HEIGHT = 15;
const greatPlaceStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};
class Marker extends react_1.default.Component {
    static propTypes = {
        text: prop_types_1.default.string
    };
    static defaultProps = {};
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", { style: greatPlaceStyle }));
    }
}
exports.default = Marker;
//# sourceMappingURL=index.js.map