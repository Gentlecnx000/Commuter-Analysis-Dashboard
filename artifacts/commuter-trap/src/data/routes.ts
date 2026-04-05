export interface RouteData {
  dist: number;
  c: number;
  pt_am: number;
  pt_pm: number;
  pt_transfers: number;
  pt_fare: number;
  pt_mode: string;
}

export const ROUTE_MATRIX: Record<string, RouteData> = {
  "Inbound: Square One, Mississauga -> Union Station": { dist: 26.0, c: 2.212, pt_am: 52.0, pt_pm: 50.0, pt_transfers: 1, pt_fare: 3.75, pt_mode: 'MiWay Bus + GO Train' },
  "Inbound: Brampton GO -> Union Station": { dist: 42.3, c: 1.803, pt_am: 35.0, pt_pm: 45.0, pt_transfers: 0, pt_fare: 8.67, pt_mode: 'Kitchener Line GO Train' },
  "Inbound: Oakville GO -> Union Station": { dist: 36.7, c: 1.737, pt_am: 34.0, pt_pm: 32.0, pt_transfers: 0, pt_fare: 8.16, pt_mode: 'Lakeshore West GO Train' },
  "Inbound: Markham Civic Centre -> Union Station": { dist: 30.5, c: 2.377, pt_am: 70.0, pt_pm: 70.0, pt_transfers: 1, pt_fare: 7.78, pt_mode: 'YRT Viva Bus + GO Train' },
  "Inbound: Richmond Hill GO -> Union Station": { dist: 35.8, c: 2.095, pt_am: 55.0, pt_pm: 51.0, pt_transfers: 0, pt_fare: 8.15, pt_mode: 'Richmond Hill GO Train' },
  "Inbound: Vaughan Metro Centre -> Union Station": { dist: 43.1, c: 1.392, pt_am: 44.0, pt_pm: 45.0, pt_transfers: 0, pt_fare: 3.3, pt_mode: 'TTC Subway Line 1' },
  "Inbound: Scarborough Town Centre -> Union Station": { dist: 25.3, c: 2.470, pt_am: 42.0, pt_pm: 42.0, pt_transfers: 1, pt_fare: 3.7, pt_mode: 'TTC Bus + GO Train' },
  "Inbound: Pickering GO -> Union Station": { dist: 41.3, c: 1.786, pt_am: 48.0, pt_pm: 45.0, pt_transfers: 0, pt_fare: 7.19, pt_mode: 'Lakeshore East GO Train' },
  "Inbound: Oshawa (Ontario Tech) -> Union Station": { dist: 69.7, c: 1.309, pt_am: 100.0, pt_pm: 100.0, pt_transfers: 1, pt_fare: 9.3, pt_mode: 'DRT Bus + GO Train' },
  "Inbound: Univ. of Guelph -> Union Station": { dist: 90.1, c: 1.110, pt_am: 103.0, pt_pm: 104.0, pt_transfers: 1, pt_fare: 13.59, pt_mode: 'GO Bus + GO Train' },
  "Inbound: Univ. of Waterloo -> Union Station": { dist: 117.0, c: 0.983, pt_am: 147.0, pt_pm: 146.0, pt_transfers: 2, pt_fare: 17.0, pt_mode: 'GO Train + GO Bus' },
  "Inbound: McMaster Univ. -> Union Station": { dist: 68.1, c: 1.340, pt_am: 97.0, pt_pm: 100.0, pt_transfers: 1, pt_fare: 10.05, pt_mode: 'GO Bus + GO Train' },
  "Inbound: Barrie South GO -> Union Station": { dist: 105.0, c: 1.143, pt_am: 98.0, pt_pm: 98.0, pt_transfers: 0, pt_fare: 12.83, pt_mode: 'Barrie Line GO Train' },
  "Reverse: Scarborough Town Centre -> Univ. of Guelph": { dist: 98.8, c: 1.063, pt_am: 147.0, pt_pm: 170.0, pt_transfers: 1, pt_fare: 12.45, pt_mode: 'GO Bus' },
  "Reverse: Square One, Mississauga -> Univ. of Guelph": { dist: 68.0, c: 0.809, pt_am: 72.0, pt_pm: 80.0, pt_transfers: 0, pt_fare: 10.73, pt_mode: 'GO Bus' },
  "Reverse: Brampton GO -> Univ. of Waterloo": { dist: 89.8, c: 0.947, pt_am: 118.0, pt_pm: 148.0, pt_transfers: 2, pt_fare: 15.58, pt_mode: 'Kitchener GO Train + GO Bus + GRT Bus' },
  "Reverse: Markham Civic Centre -> Univ. of Waterloo": { dist: 124.0, c: 0.776, pt_am: 186.0, pt_pm: 211.0, pt_transfers: 4, pt_fare: 18.02, pt_mode: 'YRT Viva Bus + GO Bus + GRT Bus' },
  "Reverse: Vaughan Metro Centre -> Barrie South GO": { dist: 68.3, c: 0.787, pt_am: 156.0, pt_pm: 80.0, pt_transfers: 2, pt_fare: 11.74, pt_mode: 'TTC Subway + GO Train' },
  "Reverse: McMaster Univ. -> Square One, Mississauga": { dist: 48.3, c: 1.009, pt_am: 76.0, pt_pm: 60.0, pt_transfers: 0, pt_fare: 9.89, pt_mode: 'GO Bus' },
  "Reverse: Univ. of Guelph -> Square One, Mississauga": { dist: 67.1, c: 0.913, pt_am: 100.0, pt_pm: 72.0, pt_transfers: 1, pt_fare: 10.73, pt_mode: 'GO Bus' },
  "Reverse: Oshawa (Ontario Tech) -> Univ. of Waterloo": { dist: 162.0, c: 0.741, pt_am: 187.0, pt_pm: 243.0, pt_transfers: 2, pt_fare: 25.52, pt_mode: 'GO Bus + GRT Bus' },
  "Cross-Region: Markham Civic Centre -> Square One, Mississauga": { dist: 50.0, c: 1.550, pt_am: 97.0, pt_pm: 94.0, pt_transfers: 1, pt_fare: 10.18, pt_mode: 'YRT Bus + GO Bus' },
  "Cross-Region: Scarborough Town Centre -> Vaughan Metro Centre": { dist: 32.4, c: 1.813, pt_am: 68.0, pt_pm: 70.0, pt_transfers: 1, pt_fare: 5.85, pt_mode: 'GO Bus + YRT Viva Bus' },
  "Cross-Region: Brampton GO -> Markham Civic Centre": { dist: 56.7, c: 1.587, pt_am: 103.0, pt_pm: 89.0, pt_transfers: 2, pt_fare: 11.87, pt_mode: 'GO Train/Bus + Local Bus' },
  "Cross-Region: Richmond Hill GO -> Square One, Mississauga": { dist: 45.7, c: 1.614, pt_am: 80.0, pt_pm: 98.0, pt_transfers: 1, pt_fare: 8.41, pt_mode: 'Richmond Hill GO Train + GO Bus' },
  "Cross-Region: Oshawa (Ontario Tech) -> Markham Civic Centre": { dist: 40.4, c: 1.516, pt_am: 70.0, pt_pm: 95.0, pt_transfers: 1, pt_fare: 8.79, pt_mode: 'GO Bus + YRT Bus' },
  "Cross-Region: Oakville GO -> Vaughan Metro Centre": { dist: 46.2, c: 1.515, pt_am: 87.0, pt_pm: 94.0, pt_transfers: 1, pt_fare: 10.31, pt_mode: 'GO Train + TTC Subway' },
  "Cross-Region: Square One, Mississauga -> Vaughan Metro Centre": { dist: 30.2, c: 1.531, pt_am: 56.0, pt_pm: 72.0, pt_transfers: 1, pt_fare: 10.45, pt_mode: 'GO Bus + TTC Subway' },
  "Cross-Region: Pickering GO -> Brampton GO": { dist: 67.1, c: 1.472, pt_am: 140.0, pt_pm: 140.0, pt_transfers: 1, pt_fare: 11.87, pt_mode: 'GO Bus + Brampton Transit Bus' },
  "Cross-Region: Scarborough Town Centre -> Square One, Mississauga": { dist: 43.8, c: 1.655, pt_am: 94.0, pt_pm: 101.0, pt_transfers: 1, pt_fare: 5.34, pt_mode: 'GO Bus + MiWay Bus' },
  "Cross-Region: Vaughan Metro Centre -> Markham Civic Centre": { dist: 17.9, c: 2.346, pt_am: 71.0, pt_pm: 60.0, pt_transfers: 0, pt_fare: 3.88, pt_mode: 'YRT Viva Bus' },
  "Extreme: McMaster Univ. -> Univ. of Guelph": { dist: 44.3, c: 1.213, pt_am: 75.0, pt_pm: 71.0, pt_transfers: 0, pt_fare: 11.19, pt_mode: 'GO Bus' },
  "Extreme: Univ. of Waterloo -> McMaster Univ.": { dist: 75.6, c: 0.959, pt_am: 134.0, pt_pm: 150.0, pt_transfers: 1, pt_fare: 14.09, pt_mode: 'GO Bus' },
  "Extreme: Barrie South GO -> Univ. of Waterloo": { dist: 178.0, c: 0.815, pt_am: 999.0, pt_pm: 235.0, pt_transfers: 3, pt_fare: 25.12, pt_mode: 'Barrie GO Train + GO Bus' },
  "Extreme: Univ. of Guelph -> Univ. of Waterloo": { dist: 31.1, c: 1.648, pt_am: 110.0, pt_pm: 92.0, pt_transfers: 1, pt_fare: 10.91, pt_mode: 'GO Bus + GRT Bus' },
};

export const ROUTE_KEYS = Object.keys(ROUTE_MATRIX);
