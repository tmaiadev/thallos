import Button from "@/components/ui/button";
import Checkbox from "../../ui/checkbox";
import RadioButton from "@/components/ui/radio-button";
import Fieldset from "@/components/ui/fieldset";
import style from "./DesignSystem.module.css";
import TextField from "@/components/ui/text-field";
import Separator from "@/components/ui/separator";

export function DesignSystem() {
  return (
    <div className={style.wrapper}>
      <h1>Thall<b>OS</b></h1>
      <h2>Components</h2>
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
    </div>
  );
};