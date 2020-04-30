import React from "react";
import movielogo from "./download.jpg";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      titletext: "",
      noResponse: false
    };
  }
  handleImage = text => {
    Linking.openURL(
      "https://www.themoviedb.org/search/movie?query=" +
        text +
        "&language=en-US"
    );
  };
  handleTitle = text => {
    this.setState({ titletext: text });
  };
  handleSubmit = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ebb70591bea83da1e546b12ae39c403c&query=${
        this.state.titletext
      }

      `
    )
      .then(response => response.json())
      .then(data => this.setState({ movies: data.results }));
    if (this.state.movies.length) {
      this.setState({
        noResponse: false
      });
    } else {
      this.setState({
        noResponse: true
      });
    }
  };
  componentDidMount() {
    // alert("Welcome");
  }

  render() {
    const movieList = this.state.movies.map(movie => (
      <TouchableHighlight
        key={movie.id}
        onPress={() => {
          this.handleImage(movie.title);
        }}
      >
        <View
          style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: "row"
          }}
        >
          <View
            id={movie.id}
            class="imgClass"
            style={{
              marginRight: 10,
              marginLeft: 5
            }}
          >
            <Image
              style={{
                width: 100,
                height: 150
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                width: 100,
                flexWrap: "wrap"
              }}
            >
              {movie.title}
            </Text>
          </View>

          <View>
            <Text
              numberOfLines={10}
              style={{
                width: 250,
                flexWrap: "wrap"
              }}
            >
              {movie.overview}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    ));

    return (
      <View>
        <View
          style={{
            backgroundColor: "black",
            color: "white",
            width: 360,
            height: 60,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View>
            <Image
              source={movielogo}
              style={{
                width: 55,
                height: 55,
                padding: 10,
                marginRight: 10
              }}
            />
          </View>

          <View>
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                fontSize: 30
              }}
            >
              Silla Movie Search
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "green",
              width: 300
            }}
          >
            <TextInput
              onChangeText={this.handleTitle}
              ref={input => {
                this.textInput = input;
              }}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "green",
              width: 60
            }}
          >
            <Button title="Go" onPress={this.handleSubmit} />
          </View>
        </View>
        <ScrollView
          style={{
            color: "white",

            fontSize: 30
          }}
        >
          {movieList}
        </ScrollView>
        <View>
          {this.state.noResponse ? (
            <Text>No results for this search</Text>
          ) : null}
        </View>
      </View>
    );
  }
}
