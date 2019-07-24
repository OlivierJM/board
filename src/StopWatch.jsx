import React from "react";

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: true,
            elapsedTime: 0,
            previousTime: 0
        };
        this.onStop = this.onStop.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.onTick, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onStop = () => {
        this.setState({ running: false });
    };

    onTick = () => {
        if (this.state.running) {
            let now = Date.now();
            this.setState({
                previousTime: now,
                elapsedTime:
                    this.state.elapsedTime + (now - this.state.previousTime)
            });
        }
    };

    onStart = () => {
        this.setState({
            running: true,
            previousTime: Date.now()
        });
    };

    onReset = () => {
        this.setState({
            elapsedTime: 0,
            previousTime: Date.now()
        });
    };

    render() {
        let seconds = Math.floor(this.state.elapsedTime / 1000);
        return (
            <div className="stopwatch">
                <h2>Time</h2>
                <div className="stopwatch-time" style={{ fontSize: 40 }}>
                    {seconds}
                </div>
                {this.state.running ? (
                    <button onClick={this.onStop}>Stop</button>
                ) : (
                    <button onClick={this.onStart}>Start</button>
                )}
                <button onClick={this.onReset}>Reset</button>
            </div>
        );
    }
}

export default Stopwatch;
