export interface MAN_DOM_IMAGE_ENDPOINT_BODY {
  data: Data;
  config: Config;
  operation: Operation;
}

export interface Data {
  source_headswapObjs: SourceHeadswapObj[];
  target_image: string;
}

export interface SourceHeadswapObj {
  head_img: string;
  headselection_mask: string;
  FD_coordinates: number[];
  LM_coordinates: LmCoordinates;
  skincolor: number[];
}

export interface LmCoordinates {
  betweeneyes: number[];
  nose_coordinats: number[];
  cheek_coordinates: number[];
  chin_coordinates: number[];
  eye_distance: number;
  eyegap_chin_distance: number;
}

export interface Config {
  ASD: Asd;
  return_img_format: string;
}

export interface Asd {
  skincolortransfer: number;
  headorientation: number;
  hairtransfer: number;
  generic_setting1: number;
  generic_setting2: number;
}

export interface Operation {
  userid: string;
  package_sent_time: string;
  counter: number;
  link: string;
  operation_name: string;
}
