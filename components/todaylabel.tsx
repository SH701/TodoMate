import { Text } from 'react-native';

const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

type TodayLabelProps = {
  theme: {
    days:string
  };
};

export default function TodayLabel({ theme }: TodayLabelProps) {
  const now     = new Date();
  const month   = MONTHS[now.getMonth()];
  const day     = now.getDate();
  const weekday = WEEKDAYS[now.getDay()];

  return (
    <Text
      style={{
        fontSize: 12,
        color: theme.days,      
        paddingTop: 10,
        opacity: 0.6,
      }}
    >
      {`${month} ${day} ${weekday}`}
    </Text>
  );
}
