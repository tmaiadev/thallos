import Button from "@/components/ui/button";
import { Checkbox } from "../../ui/checkbox/Checkbox";
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
    </div>
  );
};