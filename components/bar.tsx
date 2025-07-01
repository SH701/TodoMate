import { Animated, Text, View } from "react-native";
import { useRef, useEffect } from "react";

interface Props {
  styles: any;
  percent: number;
  theme: any;
}

export default function Bar({ styles, theme, percent }: Props) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressWrapper}>
      <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <View
          style={{
            ...styles.progressBarBackground,
            backgroundColor: theme.grey,
            flex:1,
          }}
        >
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: widthInterpolated,
                backgroundColor: theme.bar,
              },
            ]}
          />
        </View>
         <Text style={{ color: theme.text, fontSize: 14 }}>{Math.round(percent)}%</Text>
      </View>
    </View>
  );
}
