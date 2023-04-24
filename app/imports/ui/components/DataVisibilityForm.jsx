import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const DataVisibilityForm = () => {
  const [shareAlcoholPreference, setShareAlcoholPreference] = useState(false);
  const [shareAlcoholPreferenceForFlatmates, setShareAlcoholPreferenceForFlatmates] = useState(false);
  const [shareSleepPreference, setShareSleepPreference] = useState(false);
  const [shareSleepPreferenceForFlatmates, setShareSleepPreferenceForFlatmates] = useState(false);
  const [shareSex, setShareSex] = useState(false);
  const [shareSexPreferenceForFlatmates, setShareSexPreferenceForFlatmates] = useState(false);

  return (
    <div className="data-visibility-form">
      <h2>Data Visibility</h2>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Share alcohol preference"
            checked={shareAlcoholPreference}
            onChange={(e) => setShareAlcoholPreference(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Share alcohol preference for flatmates"
            checked={shareAlcoholPreferenceForFlatmates}
            onChange={(e) => setShareAlcoholPreferenceForFlatmates(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Share sleep preference"
            checked={shareSleepPreference}
            onChange={(e) => setShareSleepPreference(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Share sleep preference for flatmates"
            checked={shareSleepPreferenceForFlatmates}
            onChange={(e) => setShareSleepPreferenceForFlatmates(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Share sex"
            checked={shareSex}
            onChange={(e) => setShareSex(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Share sex preference for flatmates"
            checked={shareSexPreferenceForFlatmates}
            onChange={(e) => setShareSexPreferenceForFlatmates(e.target.checked)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default DataVisibilityForm;
