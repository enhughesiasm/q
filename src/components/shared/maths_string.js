import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

const MathsString = ({ inputString, extraClasses }) => (
	<span className={extraClasses}>
		<TeX>{inputString}</TeX>
	</span>
);

export default MathsString;
