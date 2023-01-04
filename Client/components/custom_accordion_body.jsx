import { View, Text } from "react-native";
import React from "react";

const CustomBody = ({
  date,
  start_local,
  finish_local,
  start_time,
  finish_time,
}) => {
  return (
    <View>
      <Text>{date}</Text>
      <Text>
        De {start_local} a {finish_local != null ? finish_local : "-"}
      </Text>
      <Text>
        Início às {start_time} concluído às
        {finish_time != null ? finish_time : "00:00"}
      </Text>
    </View>
  );
};

export default CustomBody;
