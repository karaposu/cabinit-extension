export interface Avatar {
  images: Images;
  FD_coordinates: number[];
  LM_coordinates: LmCoordinates;
  skincolor: number[];
  total_time: TotalTime;
}

export interface Images {
  head: string;
  headselection_mask: string;
  head_transparent: string;
}

export interface LmCoordinates {
  betweeneyes: number[];
  nose_coordinats: number[];
  cheek_coordinates: number[];
  chin_coordinates: number[];
  eye_distance: number;
  eyegap_chin_distance: number;
}

export interface TotalTime {
  Total_ImgOp_Time: number;
  decoding_img: number;
  create_headswapObj: number;
  create_headmask: number;
}
