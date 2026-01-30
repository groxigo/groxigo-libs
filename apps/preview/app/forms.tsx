import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import {
  Text,
  Input,
  TextArea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Select,
  Slider,
  Divider,
} from '@groxigo/ui-elements';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text variant="h4" style={{ marginBottom: 12 }}>{title}</Text>
      {children}
    </View>
  );
}

export default function FormsScreen() {
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>('');
  const [sliderValue, setSliderValue] = useState(50);

  const selectOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Disabled Option', value: 'opt4', disabled: true },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Input">
        <View style={{ gap: 16 }}>
          <Input
            label="Default Input"
            placeholder="Enter text..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input
            label="With Helper Text"
            placeholder="Enter email"
            helperText="We'll never share your email"
          />
          <Input
            label="Error State"
            placeholder="Enter password"
            error="Password is required"
          />
          <Input
            label="Disabled"
            placeholder="Disabled input"
            disabled
          />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Input size="sm" placeholder="Small" style={{ flex: 1 }} />
            <Input size="md" placeholder="Medium" style={{ flex: 1 }} />
            <Input size="lg" placeholder="Large" style={{ flex: 1 }} />
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="TextArea">
        <View style={{ gap: 16 }}>
          <TextArea
            label="Message"
            placeholder="Type your message..."
            value={textAreaValue}
            onChangeText={setTextAreaValue}
            rows={4}
          />
          <TextArea
            label="With Error"
            placeholder="Required field"
            error="This field is required"
          />
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Checkbox">
        <View style={{ gap: 12 }}>
          <Checkbox
            label="Accept terms and conditions"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <Checkbox
            label="Primary color"
            colorScheme="primary"
            checked
          />
          <Checkbox
            label="Success color"
            colorScheme="success"
            checked
          />
          <Checkbox
            label="Disabled"
            disabled
          />
          <Checkbox
            label="Indeterminate"
            indeterminate
          />
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Radio">
        <RadioGroup
          value={selectedRadio}
          onChange={setSelectedRadio}
        >
          <View style={{ gap: 12 }}>
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
            <Radio value="option4" label="Disabled" disabled />
          </View>
        </RadioGroup>
      </Section>

      <Divider spacing={16} />

      <Section title="Switch">
        <View style={{ gap: 12 }}>
          <Switch
            label="Enable notifications"
            value={isSwitchOn}
            onValueChange={setIsSwitchOn}
          />
          <Switch
            label="Primary color"
            colorScheme="primary"
            value={true}
          />
          <Switch
            label="Success color"
            colorScheme="success"
            value={true}
          />
          <Switch
            label="Disabled"
            disabled
          />
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Select">
        <View style={{ gap: 16 }}>
          <Select
            label="Choose an option"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Select..."
          />
          <Select
            label="With Error"
            options={selectOptions}
            error="Selection required"
          />
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Slider">
        <View style={{ gap: 16 }}>
          <Slider
            label="Volume"
            value={sliderValue}
            onValueChange={setSliderValue}
            showValue
          />
          <Slider
            label="Custom Range"
            minimumValue={0}
            maximumValue={1000}
            step={100}
            value={500}
            showValue
            formatValue={(v) => `$${v}`}
          />
          <Slider
            label="Success Color"
            colorScheme="success"
            value={75}
            showValue
          />
        </View>
      </Section>
    </ScrollView>
  );
}
