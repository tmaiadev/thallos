import Button from "@/components/ui/button";
import { Checkbox } from "../../ui/checkbox";
import { RadioButton } from "../../ui/radio-button";
import style from "./DesignSystem.module.css";

export function DesignSystem() {
  return (
    <div className={style.wrapper}>
      <h1>Thall<b>OS</b></h1>
      <h2>Components</h2>
      <h3>Button</h3>
      <Button>OK</Button>
      <Button disabled>Disabled</Button>
      <h3>Checkbox</h3>
      <Checkbox>Normal checkbox</Checkbox>
      <Checkbox defaultChecked>Checked checkbox</Checkbox>
      <Checkbox disabled>Normal checkbox</Checkbox>
      <Checkbox defaultChecked disabled>Normal checkbox</Checkbox>
      <h3>RadioButton</h3>
      <RadioButton name="option" value="0">Normal radio button</RadioButton>
      <RadioButton name="option" value="1" defaultChecked>Checked radio button</RadioButton>
      <RadioButton disabled>Disabled radio button</RadioButton>
      <RadioButton defaultChecked disabled>Checked disabled radio button</RadioButton>
    </div>
  );
};