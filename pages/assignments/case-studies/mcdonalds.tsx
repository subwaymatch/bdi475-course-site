import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedCodingQuestion from "components/common/RecordedCodingQuestion";
import LargeQuote from "components/common/LargeQuote";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
} from "victory";
import colors from "styles/colors.module.scss";

const mac_global_data = [
  {
    year: 2015,
    num_employees: 420000,
    num_locations: 36525,
    ad_spent: 1430,
  },
  {
    year: 2016,
    num_employees: 375000,
    num_locations: 36899,
    ad_spent: 1460,
  },
  {
    year: 2017,
    num_employees: 235000,
    num_locations: 27241,
    ad_spent: 1510,
  },
  {
    year: 2018,
    num_employees: 210000,
    num_locations: 37855,
    ad_spent: 1540,
  },
  {
    year: 2019,
    num_employees: 205000,
    num_locations: 38695,
    ad_spent: 1620,
  },
];

const franchise_revenues = [
  {
    year: 2015,
    rents: 5860.6,
    royalties: 2980.7,
    initial_fees: 83.4,
  },
  {
    year: 2016,
    rents: 6107.6,
    royalties: 3129.9,
    initial_fees: 89.4,
  },
  {
    year: 2017,
    rents: 6496.3,
    royalties: 3518.7,
    initial_fees: 86.5,
  },
  {
    year: 2018,
    rents: 7082.2,
    royalties: 3886.3,
    initial_fees: 44,
  },
  {
    year: 2019,
    rents: 7500.2,
    royalties: 4107.1,
    initial_fees: 48.4,
  },
];

let franchiseRevenuesStacked = {
  rents: [],
  royalties: [],
  initial_fees: [],
};

for (let year = 2015; year <= 2019; year++) {
  ["rents", "royalties", "initial_fees"].forEach((key) => {
    franchiseRevenuesStacked[key].push({
      year,
      amount: franchise_revenues[year - 2015][key],
    });
  });
}

export default function McDonaldsCasePage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1
                className="pageTitle"
                style={{
                  fontWeight: 800,
                }}
              >
                McDonald's Case Study
              </h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <Image
                src="/images/case-studies/ShareholderResources_Hero_Desktop.jpg"
                width={1440}
                height={810}
                alt=""
              />
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={8}>
              <div className={styles.textBox}>
                <h3>Summary</h3>

                <span className="label yellow">History</span>
                <p>
                  McDonald's is an American fast-food chain that has been
                  operating since the 1940s. The first restaurant operated by
                  the McDonald brothers was based in San Bernardino, California.
                  In 1955, a multimixer salesman named Ray Kroc joined the
                  McDonald brothers and founded McDonald's System, Inc. Six
                  years later, Ray Kroc bought the exclusive rights to the
                  McDonald's naming.
                </p>
              </div>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <span className="label green">Case Study</span>
            <p>
              Through mid 2010s, McDonald's experienced a continuous decline in
              its revenues. S
            </p>

            <h4>Number of McDonalds Employees Worldfwide from 2015-2019</h4>
            <VictoryChart
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
              domainPadding={20}
            >
              <VictoryAxis
                tickValues={mac_global_data.map((o) => o.year)}
                tickFormat={mac_global_data.map((o) => o.year)}
              />
              <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />
              <VictoryBar
                data={mac_global_data}
                labels={mac_global_data.map((o) => o.num_employees)}
                style={{
                  labels: { fontSize: 8 },
                }}
                // data accessor for x values
                x="year"
                // data accessor for y values
                y="num_employees"
              />
            </VictoryChart>
          </CenteredColumn>

          <CenteredColumn>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
              <VictoryAxis
                tickValues={franchise_revenues.map((o) => o.year)}
                tickFormat={franchise_revenues.map((o) => o.year)}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `$${x / 1000} bil.`}
              />
              <VictoryStack
                colorScale={[colors.purple, colors.green, colors.yellow]}
              >
                {Object.keys(franchiseRevenuesStacked).map((o) => (
                  <VictoryBar
                    data={franchiseRevenuesStacked[o]}
                    x="year"
                    y="amount"
                  />
                ))}
              </VictoryStack>
            </VictoryChart>
          </CenteredColumn>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Understand the <code>bool</code> data type.
              </>,
              <>Why are booleans so important in programming?</>,
              <>
                Discuss the <span className="color-purple">operators</span> that
                return boolean values.
              </>,
              <>
                Understand <code>if</code>/<code>else</code> statements.
              </>,
            ]}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
