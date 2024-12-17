export const dummyData = [
  {
    title: "Performance",
    type: "line",
    data: [
      [
        {
          name: "Performance one",
          queryValue: "select * from product",
          tenantName: "tenannt one",
          chartType: "line",
          data: [200, 310, 400, 1001, 400, 306, 302, 230, 140, 80, 50, 20],
        },
      ],
      [
        {
          name: "Performance two",
          queryValue: "select * from product",
          tenantName: "tenannt two",
          chartType: "line",
          data: [150, 210, 330, 800, 300, 256, 200, 180, 100, 60, 40, 10],
        },
      ],
      [
        {
          name: "Performance three",
          queryValue: "select * from product",
          tenantName: "tenannt three",
          chartType: "line",
          data: [120, 180, 280, 700, 250, 206, 150, 140, 90, 50, 30, 5],
        },
      ],
    ],
  },
  {
    title: "Revenue",
    type: "bar",
    data: [
      [
        {
          name: "Revenue one",
          chartType: "bar",
          data: [200, 310, 400, 1001, 400, 306, 302, 230, 140, 80, 50, 20],
        },
      ],
      [
        {
          name: "Revenue two",
          chartType: "bar",
          data: [150, 210, 330, 800, 300, 256, 200, 180, 100, 60, 40, 10],
        },
      ],
    ],
  },
  {
    title: "Revenue Pie",
    type: "pie",
    data: [
      [200, 310, 140, 80, 50, 20],
      [150, 210, 330, 800, 300, 256, 200],
    ],
  },
];
