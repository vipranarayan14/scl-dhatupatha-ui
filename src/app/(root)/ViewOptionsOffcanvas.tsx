import { useEffect, useId, useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

import type { Query } from "@/utils/types";

import { BsCheck2, BsArrowCounterclockwise } from "react-icons/bs";

import {
  filterInputs,
  sortInput,
  viewInputsNames,
} from "@/utils/viewInputsData";
import { Icon } from "@/commons/components/Icon";

import { SortSelect } from "./SortSelect";
import { FilterSelect } from "./FilterSelect";

type Props = {
  handleHide: () => void;
  show: boolean;
  query: Query;
  setQuery: (query: Query) => void;
};

const viewInputsInitialValues = Object.fromEntries(
  viewInputsNames.map((inputName) => [inputName, ""])
);

const getInputsValuesFromQuery = (query: Query) => ({
  ...viewInputsInitialValues,
  ...query,
});

export function ViewOptionsOffcanvas({
  handleHide,
  show,
  query,
  setQuery,
}: Props) {
  const inputsValuesFromQuery = getInputsValuesFromQuery(query);

  const [inputsValues, setInputsValues] = useState<Record<string, string>>(
    inputsValuesFromQuery
  );

  const handleChange = (name: string, value: string) => {
    setInputsValues((values) => ({ ...values, [name]: value }));

    setQuery({ [name]: value });
  };

  const handleResetClick = () => {
    setInputsValues(viewInputsInitialValues);

    setQuery(viewInputsInitialValues);
  };

  const id = useId();

  useEffect(() => {
    const newInputsValues = getInputsValuesFromQuery(query);

    // To prevent re-render
    // if (newInputsValues === inputsValues) return;

    setInputsValues(newInputsValues);
  }, [query]);

  return (
    <Offcanvas
      onHide={handleHide}
      show={show}
      placement="start"
      className="_bg-surface"
      style={{ width: "300px" }}
      aria-labelledby={id}
    >
      <Offcanvas.Header>
        <Offcanvas.Title id={id}>Options</Offcanvas.Title>

        <Button
          variant="light"
          onClick={handleHide}
          className="btn-close"
          aria-label="Close"
        ></Button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div>
          <SortSelect
            {...sortInput}
            value={inputsValues[sortInput.name]}
            handleChange={handleChange}
          />
        </div>

        <div className="my-4">
          <div>
            <h2 className="h6 fw-bold">Filter by</h2>
          </div>

          {filterInputs.map(({ name, label, options }) => (
            <FilterSelect
              key={name}
              name={name}
              label={label}
              options={options}
              value={inputsValues[name]}
              handleChange={handleChange}
            />
          ))}
        </div>
      </Offcanvas.Body>

      <div className="_offcanvas-footer flex-row-reverse">
        <Button variant="outline-primary" onClick={handleHide}>
          <Icon>
            <BsCheck2 />
          </Icon>
          &nbsp;
          <span>Okay</span>
        </Button>

        <Button variant="outline-danger" onClick={handleResetClick}>
          <Icon>
            <BsArrowCounterclockwise />
          </Icon>
          &nbsp;
          <span>Reset</span>
        </Button>
      </div>
    </Offcanvas>
  );
}
