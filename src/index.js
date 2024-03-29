import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBeU-_Ko8WWmG_2lCsVBCEavjZzVb9DKNQ';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
        
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300);

        return (
            <div>
                <header>
                    <SearchBar onSearchTermChange={videoSearch} />
                </header>
                <main>
                    <VideoDetail video={this.state.selectedVideo} />
                </main>
                <aside>
                    <VideoList 
                        onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
                        videos={this.state.videos} />
                </aside>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));


