import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const days = [...Array(31)].map((_, i) => i + 1);
const months = [...Array(12)].map((_, i) => i + 1);
const years = [...Array(101)].map((_, i) => new Date().getFullYear() - i);

const DateInput = () => {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Picker
        selectedValue={day}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setDay(itemValue)}
      >
        {days.map((d, index) => (
          <Picker.Item key={index} label={d.toString()} value={d} />
        ))}
      </Picker>
      <Picker
        selectedValue={month}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setMonth(itemValue)}
      >
        {months.map((m, index) => (
          <Picker.Item key={index} label={m.toString()} value={m} />
        ))}
      </Picker>
      <Picker
        selectedValue={year}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setYear(itemValue)}
      >
        {years.map((y, index) => (
          <Picker.Item key={index} label={y.toString()} value={y} />
        ))}
      </Picker>
    </View>
  );
};

export default DateInput;
