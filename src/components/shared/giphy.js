import React, { Component } from 'react';
import PropTypes from 'prop-types';
import white from './../../resources/images/GiphyWhite.png';
import black from './../../resources/images/GiphyBlack.png';

class Giphy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiKey: '9LYRB89KKFIH8WgVUetwuoQCB0LihwnT',
			endPoint: 'https://api.giphy.com/v1/gifs/random',
			rating: 'g', // 'Y, G, PG, PG-13 and R'
			imgUrl: '',
			visible: false,
		};
	}

	componentDidMount() {
		var requestEndpoint =
			this.state.endPoint +
			'?api_key=' +
			this.state.apiKey +
			'&tag=' +
			this.props.tag +
			'&rating=' +
			this.state.rating;

		fetch(requestEndpoint, {
			method: 'GET',
		})
			.then((result) => result.json())
			.then((gif) => {
				this.setState({
					imgUrl: gif.data.images.fixed_height.url,
					visible: true,
				});
			})
			.catch((e) => {
				console.log("Couldn't load from giphy");
			});
	}

	render() {
		let poweredByLocation = this.props.colour == 'light' ? black : white;

		return (
			<div style={{ opacity: this.state.visible ? 1 : 0 }}>
				<p>
					<img src={this.state.imgUrl} />
				</p>
				<p>
					<img src={poweredByLocation} />
				</p>
			</div>
		);
	}
}

Giphy.propTypes = {
	tag: PropTypes.string.isRequired,
	colour: PropTypes.string,
};

export default Giphy;
