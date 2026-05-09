import Button from "@/components/ui/button";
import Checkbox from "../../ui/checkbox";
import RadioButton from "@/components/ui/radio-button";
import Fieldset from "@/components/ui/fieldset";
import style from "./DesignSystem.module.css";
import TextField from "@/components/ui/text-field";
import Separator from "@/components/ui/separator";
import Range from "@/components/ui/range";
import Stack, { StackItem } from "@/components/ui/stack";

export function DesignSystem() {
  return (
    <Stack gap={4} className={style.root}>
      <StackItem grow={0}>
        <h1>Thall<b>OS</b></h1>
      </StackItem>
      <StackItem grow={0}>
        <h2>Components</h2>
      </StackItem>
      <StackItem>
        <Stack gap={4}>
          <Fieldset legend="Button">
            <Button>OK</Button>
            <Button disabled>Disabled</Button>
          </Fieldset>
          <Fieldset legend="Checkbox">
            <Checkbox>Normal checkbox</Checkbox>
            <Checkbox defaultChecked>Checked checkbox</Checkbox>
            <Separator />
            <Checkbox disabled>Normal checkbox</Checkbox>
            <Checkbox defaultChecked disabled>Normal checkbox</Checkbox>
          </Fieldset>
          <Fieldset legend="Radio Buttons">
            <RadioButton name="option" value="0">Normal radio button</RadioButton>
            <RadioButton name="option" value="1" defaultChecked>Checked radio button</RadioButton>
            <Separator />
            <RadioButton disabled>Disabled radio button</RadioButton>
            <RadioButton defaultChecked disabled>Checked disabled radio button</RadioButton>
          </Fieldset>
          <Fieldset legend="Range">
            <Range label="Range" />
            <Range label="Volume" prefix="Low" suffix="High" />
            <Range label="Volume" prefix="Low" suffix="High" disabled />
            <Separator />
            <Range label="Inline Range" variant="inline" />
          </Fieldset>
          <Fieldset legend="Input">
            <TextField label="Text Field" variant="inline" />
            <TextField label="Read Only" placeholder="With Value" variant="inline" readOnly />
            <TextField label="Disabled Text Field" variant="inline" disabled />
            <TextField label="Disabled With Value" placeholder="With Value" variant="inline" disabled />
            <Separator />
            <TextField label="Text Field" />
            <TextField label="Read Only" placeholder="With Value" readOnly />
            <TextField label="Disabled Text Field" disabled />
            <TextField label="Disabled With Value" placeholder="With Value" disabled />
          </Fieldset>
          <Fieldset legend="Stack">
            <Stack gap={2} dir="horizontal">
              <StackItem grow>
                <label>Stack (default)</label>
                <Stack>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </Stack>
              </StackItem>
              <StackItem grow>
                <label>Reversed Stack</label>
                <Stack reverse>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </Stack>
              </StackItem>
            </Stack>
            <Separator />
            <Stack gap={2}>
              <StackItem>
                <label>Horizontal</label>
                <Stack dir="horizontal" alignItems="stretch">
                  <StackItem>1</StackItem>
                  <StackItem>1</StackItem>
                  <StackItem>1</StackItem>
                </Stack>
              </StackItem>
              <StackItem>
                <label>Reversed Horizontal</label>
                <Stack dir="horizontal" reverse>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </Stack>
              </StackItem>
            </Stack>
          </Fieldset>
        </Stack>
      </StackItem>
    </Stack>
  );
};