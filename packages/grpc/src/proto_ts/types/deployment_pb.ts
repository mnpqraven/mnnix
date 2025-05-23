// @generated by protoc-gen-es v2.4.0 with parameter "target=ts"
// @generated from file types/deployment.proto (package types.deployment, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file types/deployment.proto.
 */
export const file_types_deployment: GenFile = /*@__PURE__*/
  fileDesc("ChZ0eXBlcy9kZXBsb3ltZW50LnByb3RvEhB0eXBlcy5kZXBsb3ltZW50KicKDkRlcGxveW1lbnRLaW5kEgoKBkRvY2tlchAAEgkKBVNoZWxsEAFiBnByb3RvMw");

/**
 * @generated from enum types.deployment.DeploymentKind
 */
export enum DeploymentKind {
  /**
   * @generated from enum value: Docker = 0;
   */
  Docker = 0,

  /**
   * @generated from enum value: Shell = 1;
   */
  Shell = 1,
}

/**
 * Describes the enum types.deployment.DeploymentKind.
 */
export const DeploymentKindSchema: GenEnum<DeploymentKind> = /*@__PURE__*/
  enumDesc(file_types_deployment, 0);

