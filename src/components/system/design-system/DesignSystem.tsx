import Button from "@/components/ui/button";
import Checkbox from "../../ui/checkbox";
import RadioButton from "@/components/ui/radio-button";
import Fieldset from "@/components/ui/fieldset";
import style from "./DesignSystem.module.css";

export function DesignSystem() {
  return (
    <div className={style.wrapper}>
      <h1>Thall<b>OS</b></h1>
      <h2>Components</h2>
      <h3>Button</h3>
      <Button>OK</Button>
      <Button disabled>Disabled</Button>
      <Fieldset legend="Checkbox">
        <Checkbox>Normal checkbox</Checkbox>
        <Checkbox defaultChecked>Checked checkbox</Checkbox>
        <Checkbox disabled>Normal checkbox</Checkbox>
        <Checkbox defaultChecked disabled>Normal checkbox</Checkbox>
      </Fieldset>
      <Fieldset legend="Radio Buttons">
        <RadioButton name="option" value="0">Normal radio button</RadioButton>
        <RadioButton name="option" value="1" defaultChecked>Checked radio button</RadioButton>
        <RadioButton disabled>Disabled radio button</RadioButton>
        <RadioButton defaultChecked disabled>Checked disabled radio button</RadioButton>
      </Fieldset>
    </div>
  );
};