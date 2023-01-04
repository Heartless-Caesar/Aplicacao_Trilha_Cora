import { View, Text, Platform, UIManager } from "react-native";
import React, { useEffect, useState } from "react";
import home_styles from "../styles/home_page_styles";
import { AccordionList } from "react-native-accordion-list-view";
import axios from "axios";
import CustomTitle from "../components/custom_accordion_title";
import CustomBody from "../components/custom_accordion_body";

const Homepage = () => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    await axios({
      url: "http://localhost:3000/all_walks",
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
          customTitle={(item) => (
            <CustomTitle
              date={item.start_date}
              start_local={item.start_local}
              finish_local={item.finish_local}
              key={item.id}
            />
          )}
          customBody={(item) => (
            <CustomBody
              date={item.start_date}
              start_local={item.start_local}
              finish_local={item.finish_local}
              finish_time={item.finish_time}
              start_time={item.start_time}
              key={item.id}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Homepage;
