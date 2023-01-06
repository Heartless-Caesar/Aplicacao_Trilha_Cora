import custom_accordion_title_styles from "../styles/custom_accordion_title_style";
import dropdown_styles from "../styles/dropdown_styles";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const CustomBody = ({
  date,
  start_local,
  finish_local,
  start_time,
  finish_time,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {
      label: "Caminhante",
      value: "Caminhante",
    },
    {
      label: "Ciclista",
      value: "Ciclista",
    },
  ];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Modalidade
        </Text>
      );
    }
    return null;
  };

  const generate_pdf = async () => {
    await axios({
      url: "http://localhost:3000/all_walks",
      method: "GET",
      responseType: "application/json",
      params: {
        start_local: start_local,
        start_time: start_time,
        finish_local: finish_local,
        finish_time: finish_time,
        type: value,
        start_date: date,
        finish_date: f_date,
      },
    })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Pressable onPress={generate_pdf}>
        <View>
          <MaterialCommunityIcons name="download" size={20} />
        </View>
      </Pressable>
      <View style={dropdown_styles.container}>
        {renderLabel()}
        <Dropdown
          style={[dropdown_styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={dropdown_styles.placeholderStyle}
          selectedTextStyle={dropdown_styles.selectedTextStyle}
          inputSearchStyle={dropdown_styles.inputSearchStyle}
          iconStyle={dropdown_styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={dropdown_styles.icon}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    </View>
  );
};

export default CustomBody;
