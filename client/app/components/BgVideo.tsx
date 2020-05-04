import React from "react";


class BgVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadVideo: false,
        };

        this.renderPoster = this.renderPoster.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
    }

    componentDidMount() {
        this.setState({
            loadVideo: true
        });
    }

    renderPoster() {
        const { posterSrc, posterAlt } = this.props;
        const { loadVideo } = this.state;

        return (
            <img
                className={`backgroundVideo__poster ${loadVideo && 'backgroundVideo__poster--loaded'}`}
                src={posterSrc}
                alt={posterSrc} />
        )
    }

    renderVideo() {
        const { videoSrc } = this.props;
        const { loadVideo } = this.state;

        return (
            <video className={`backgroundVideo__video ${loadVideo && 'backgroundVideo__video--loaded'}`}
                loop
                muted
                autoPlay={loadVideo}>
                {videoSrc.map((video, i) => <source key={i} src={video.src} type={video.mediaType} />)}
            </video>
        )
    }

    render() {
        const { posterSrc, posterAlt, videoSrc } = this.props;
        const { loadVideo } = this.state;

        return (
            <React.Fragment>
                {this.renderPoster()}
                {loadVideo && this.renderVideo()}
            </React.Fragment>
        )
    }
};

export default BgVideo;