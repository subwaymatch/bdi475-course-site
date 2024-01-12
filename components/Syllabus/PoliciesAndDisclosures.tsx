import { Container, Row, Col } from "react-bootstrap";
import styles from "./PoliciesAndDisclosures.module.scss";

export default function PoliciesAndDisclosures() {
  return (
    <>
      <Policies />
      <Disclosures />
    </>
  );
}

function Policies() {
  return (
    <section className={styles.policies}>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="sectionTitle">
              Policies
              <span className="accent orange" />
            </h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <Row>
                <Col lg={4}>
                  <h3>Attendance</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    Your attendance is reflected towards the participation
                    points. Up to 2 absences are allowed without a prior
                    approval (no points will be deducted for the first 2
                    absences). For any special occasions, please email Amarthya
                    in advance.
                  </p>
                  <p className={styles.text}>
                    Amarthya, our TA, will be managing the attendance and
                    coordinating with those who are absent. If you are going to
                    miss a class, please directly email Amarthya at{" "}
                    <a
                      href="mailto:kuchana2@illinois.edu"
                      title="kuchana2@illinois.edu"
                    >
                      kuchana2@illinois.edu ✉️
                    </a>{" "}
                    with the following subject format - "BDI 475: Absent -
                    [Name] - [Date(s)]" (example: "BDI 475: Absent - John Doe -
                    09/14/2023) with documentation.
                  </p>
                  <p className={styles.text}>
                    👉 Valid documentation include but are not limited to:
                  </p>
                  <ul>
                    <li>
                      <a href="https://odos.illinois.edu/community-of-care/resources/students/absence-letters/">
                        Absence Letter
                      </a>
                    </li>
                    <li>
                      <a href="https://odos.illinois.edu/community-of-care/emergency-dean/">
                        A Letter from the Emergency Dean
                      </a>
                    </li>
                    <li>Doctor's Note</li>
                    <li>
                      <a href="https://www.mckinley.illinois.edu/event-confirmations-replace-visit-slips">
                        McKinley Health Center Event Confirmation
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <Row>
                <Col lg={4}>
                  <h3>Late Submissions</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    Students are to complete and submit assignments on the due
                    date.{" "}
                    <strong>
                      10% will be deducted each day from the total available
                      points of the assignment
                    </strong>{" "}
                    for late submission. No assignments will be accepted more
                    than 48 hours after the deadline.
                  </p>

                  <p className={styles.text}>
                    <strong>Final Case Study:</strong> Late submission of the
                    final assignment will NOT BE ACCEPTED to give graders enough
                    time before the grade entry deadline.
                  </p>
                  <p className={styles.text}>
                    <strong>Quizzes: </strong> Unless otherwise noted, quizzes
                    are to be accomplished in-class. Remote access or late
                    attempts will not be allowed (access code will be required).
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <div className={styles.item}>
              <Row>
                <Col lg={4}>
                  <h3>Course Recordings</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    Although not guaranteed, I will try to post a recording of
                    each lecture on Mediaspace within 48 hours. Some lecture
                    sessions may be utilized as workdays. I will not upload the
                    recordings for these sessions.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row> */}

        <Row>
          <Col>
            <div className={styles.item}>
              <Row>
                <Col lg={4}>
                  <h3>Communication</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    I will use Canvas as the primary means of communicating with
                    the class. You are responsible for ensuring that you have
                    access to Canvas for this course.
                  </p>

                  <p className={styles.text}>
                    If I need to communicate with you individually, I will send
                    you an email.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <Row>
                <Col lg={4}>
                  <h3>Getting Help</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    Please post any course-related questions on the Canvas
                    discussion board. For any other questions or feedback,
                    e-mail me at{" "}
                    <a href="mailto:ypark32@illinois.edu">
                      ypark32@illinois.edu
                    </a>
                    . If I am not available, I may refer you to one of the TAs.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <Row>
                <Col lg={4}>
                  <h3>Honor Policy</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    The University (
                    <a href="https://studentcode.illinois.edu/docs/2021-Student-Code.pdf">
                      https://studentcode.illinois.edu/docs/2021-Student-Code.pdf
                    </a>
                    ) has honor codes that students are expected to follow. The
                    following parameters should be followed for assignments in
                    this course. Group Assignments: Group work must never be
                    discussed with anyone other than members of your group, the
                    instructor, or TA, unless specifically allowed. This
                    prohibition includes classmates not in your group, students
                    not in this class, tutors, other instructors or professors,
                    friends, parents, etc. Individual Assignments: All work
                    submitted to fill the requirements of individual assignments
                    must represent your independent effort. You may discuss your
                    ideas with your fellow students. However, you must not
                    plagiarize anyone else's work. Obtaining and using a case
                    key / solution from any other sources is cheating, whether
                    you copy the authors' exact words or not.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function Disclosures() {
  return (
    <section className={styles.disclosures}>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="sectionTitle">
              Disclosures
              <span className="accent orange" />
            </h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>Food/Housing Insecurity Statement</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    Any student who faces challenges securing their food or
                    housing and believes this may affect their performance in
                    the course is urged to contact the Dean of Students for
                    support and alert the course instructor.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>Disability Resource Statement</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    To obtain disability-related academic adjustments and/or
                    auxiliary aids, students with disabilities must contact the
                    course instructor and the Disability Resources and
                    Educational Services (DRES) as soon as possible. To contact
                    DRES, you may visit 1207 S. Oak St., Champaign, call
                    217-333-4603, email disability@illinois.edu or go to the
                    DRES website: www.disability.illinois.edu.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>COVID-19 Statement</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    If you feel ill or unable to come to class or complete class
                    assignments due to issues related to COVID-19, including but
                    not limited to testing positive yourself, feeling ill,
                    caring for a family member with COVID-19, or having
                    unexpected child-care obligations, you should contact your
                    instructor immediately, and you are encouraged to copy your
                    academic advisor.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>Building Emergency Procedures</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    In the event of a tornado warning, please seek shelter in
                    the Wohlers Hall basement or the Armory, or in the BIF
                    basement between 8 am and 4:30 pm weekdays (the nearest
                    designated University tornado shelters). If a tornado is
                    imminent, the BIF basement stairwells also can be used on an
                    emergency basis. In the event of a fire in BIF, exit BIF and
                    proceed to 141 Wohlers Hall. In the event of threat from a
                    shooter on campus, lock down the classroom and move to a
                    place of safety within the classroom. If you encounter a
                    suspicious package, do not touch the package; alert campus
                    security, and refrain from cell phone usage until the
                    situation is resolved. More detailed information and action
                    instructions are available in the Building Emergency Action
                    Plan.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>Campus Emergency Statement</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    Emergencies can happen anywhere and at any time, so it's
                    important that we take a minute to prepare for a situation
                    in which our safety could depend on our ability to react
                    quickly. Take a moment to learn the different ways to leave
                    this building. If there's ever a fire alarm or something
                    like that, you'll know how to get out and you'll be able to
                    help others get out. Next, figure out the best place to go
                    in case of severe weather – we'll need to go to a low-level
                    in the middle of the building, away from windows. And
                    finally, if there's ever someone trying to hurt us, our best
                    option is to run out of the building. If we cannot do that
                    safely, we'll want to hide somewhere we can't be seen, and
                    we'll have to lock or barricade the door if possible and be
                    as quiet as we can. We will not leave that safe area until
                    we get an Illini-Alert confirming that it's safe to do so.
                    If we can't run or hide, we'll fight back with whatever we
                    can get our hands on. If you want to better prepare yourself
                    for any of these situations, visit police.illinois.edu/safe.
                    Remember you can sign up for emergency text messages at{" "}
                    <a href="http://emergency.illinois.edu/">
                      http://emergency.illinois.edu/
                    </a>
                    .
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>Sexual Misconduct Policy and Reporting</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    The University of Illinois is committed to combating sexual
                    misconduct. Faculty and staff members are required to report
                    any instances of sexual misconduct to the University's Title
                    IX and Disability Office. In turn, an individual with the
                    Title IX and Disability Office will provide information
                    about rights and options, including accommodations, support
                    services, the campus disciplinary process, and law
                    enforcement options. A list of the designated University
                    employees who, as counselors, confidential advisors, and
                    medical professionals, do not have this reporting
                    responsibility and can maintain confidentiality, can be
                    found here:{" "}
                    <a
                      href="http://wecare.illinois.
                    edu/resources/students/#confidential"
                    >
                      http://wecare.illinois.
                      edu/resources/students/#confidential
                    </a>
                    . Other information about resources and reporting is
                    available here:{" "}
                    <a href="http://wecare.illinois.edu">
                      http://wecare.illinois.edu
                    </a>
                    .
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.item}>
              <h3>Mental Health Information</h3>

              <Row>
                <Col xxl={8} xl={10} lg={12}>
                  <p className={styles.text}>
                    Diminished mental health, including significant stress, mood
                    changes, excessive worry, substance/alcohol abuse, or
                    problems with eating and/or sleeping can interfere with
                    optimal academic performance, social development, and
                    emotional wellbeing. The University of Illinois offers a
                    variety of confidential services including individual and
                    group counseling, crisis intervention, psychiatric services,
                    skill-building workshops, and specialized screenings at no
                    additional cost. If you or someone you know experiences any
                    of the above mental health concerns, it is strongly
                    encouraged to contact or visit any of the University's
                    resources provided below. Getting help is a smart and
                    courageous thing to do – for yourself and for those who care
                    about you.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <div className={styles.resourceItem}>
              <h4>Counseling Center</h4>
              <span className={styles.phoneNumber}>217-333-3704</span>
              <span className={styles.address}>
                610 East John Street, Champaign, IL
              </span>

              <p>
                Jennifer House is the Gies Embedded Clinical Counselor from the
                Counseling Center. Jennifer provides individual counseling as
                well as consultation hours to Gies students. Contact Jennifer
                directly via email at jhouse@illinois.edu to schedule an
                appointment or for additional information. You can also visit
                the counseling center website site at:
                <a href="http://counselingcenter.illinois.edu/about-us/embedded-counselors">
                  http://counselingcenter.illinois.edu/about-us/embedded-counselors
                </a>
                .
              </p>
            </div>
          </Col>

          <Col lg={6}>
            <div className={styles.resourceItem}>
              <h4>McKinley Health Center</h4>
              <span className={styles.phoneNumber}>217-333-2700</span>
              <span className={styles.address}>
                1109 South Lincoln Avenue, Urbana, IL
              </span>
            </div>

            <div className={styles.resourceItem}>
              <h4>Disability Resources &amp; Educational Services (DRES)</h4>
              <span className={styles.phoneNumber}>217-333-1970</span>
              <span className={styles.address}>
                1207 S Oak St, Champaign, IL
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
