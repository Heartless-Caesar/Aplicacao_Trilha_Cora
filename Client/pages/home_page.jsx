import { View, Text, Platform, UIManager } from "react-native";
import React, { useEffect, useState } from "react";
import home_styles from "../styles/home_page_styles";
import { AccordionList } from "react-native-accordion-list-view";
import axios from "axios";

const Homepage = () => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    await axios({
      url: "http://localhost:3000/Get_walks",
      method: "GET",
      responseType: "application/json",
    })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <View style={home_styles.container}>
        <AccordionList
          data={items}
          customTitle={(item) => <Text>{item.title}</Text>}
          customBody={(item) => <Text>{item.body}</Text>}
        />
      </View>
    </View>
  );
};

export default Homepage;
