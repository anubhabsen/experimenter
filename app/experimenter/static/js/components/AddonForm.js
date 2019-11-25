import PropTypes from "prop-types";
import React from "react";
import { List, Map } from "immutable";
import { Row, Col, Form } from "react-bootstrap";

import BranchManager from "experimenter/components/BranchManager";
import BranchedAddonFields from "experimenter/components/BranchedAddonFields";
import DesignInput from "experimenter/components/DesignInput";
import GenericBranchFields from "experimenter/components/GenericBranchFields";
import {
  ADDON_EXPERIMENT_ID_HELP,
  ADDON_RELEASE_URL_HELP,
} from "experimenter/components/constants";
import BranchedAddonFields from "experimenter/components/BranchedAddonFields";
import RadioButton from "experimenter/components/RadioButton";

export default class AddonForm extends React.PureComponent {
  static propTypes = {
    data: PropTypes.instanceOf(Map),
    errors: PropTypes.instanceOf(Map),
    handleDataChange: PropTypes.func,
    handleErrorsChange: PropTypes.func,
    handleBranchedAddonRadio: PropTypes.func,
  };

  renderSingleAddonFields() {
    if (!this.props.data.get("is_branched_addon")) {
      return (
        <React.Fragment>
          <DesignInput
            label="Addon Experiment Name"
            name="addon_experiment_id"
            onChange={value => {
              props.handleDataChange("addon_experiment_id", value);
            }}
            value={props.data.get("addon_experiment_id")}
            error={props.errors.get("addon_experiment_id", "")}
            helpContent={ADDON_EXPERIMENT_ID_HELP}
          />

          <DesignInput
            label="Signed Release URL"
            name="addon_release_url"
            onChange={value => {
              props.handleDataChange("addon_release_url", value);
            }}
            value={props.data.get("addon_release_url")}
            error={props.errors.get("addon_release_url", "")}
            helpContent={ADDON_RELEASE_URL_HELP}
          />
          <hr className="heavy-line my-5" />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div>
        <Row className="mb-3">
          <Col md={{ span: 4, offset: 3 }}>
            <h4 className="mb-3">Firefox Add-On</h4>
          </Col>
        </Row>

        <RadioButton
          {...this.props}
          elementLabel="Does this experiment ship a single addon to all branches or multiple addons?"
          radioGroupName="branchedAddonGroup"
          radioLabel1="Single Addon"
          radioLabel2="Multiple Addons"
          radioValue1="false"
          radioValue2="true"
        />

        <hr className="heavy-line my-5" />

        {this.renderSingleAddonFields()}

        <BranchManager
          branchFieldsComponent={
            this.props.data.get("is_branched_addon")
              ? BranchedAddonFields
              : GenericBranchFields
          }
          branches={this.props.data.get("variants", new List())}
          errors={this.props.errors.get("variants", new List())}
          handleDataChange={this.props.handleDataChange}
          handleErrorsChange={this.props.handleErrorsChange}
        />
      </div>
    );
  }
}
