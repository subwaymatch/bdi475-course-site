import { Container, Row, Col } from "react-bootstrap";
import styles from "./PoliciesAndDisclosures.module.scss";
import clsx from "clsx";

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
      <Container>
        <Row>
          <Col>
            <h2>Policies</h2>
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
                    absences). For any special occasions, please email me in
                    advance.
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
                  <h3>Course Recordings</h3>
                </Col>

                <Col lg={8}>
                  <p className={styles.text}>
                    I will post a recording of each lecture on Mediaspace within
                    24 hours. Some lecture sessions may be workdays without a
                    discussion of new topics. I will not upload the recordings
                    for these sessions.
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
      <Container>
        <Row>
          <Col>
            <h2>Disclosures</h2>
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
                    <span className="color-dark-gray w-600">General</span> -
                    Following University policy, all students are required to
                    engage in appropriate behavior to protect the health and
                    safety of the community. Students are also required to
                    follow the campus COVID-19 protocols. Students who feel ill
                    must not come to class. In addition, students who test
                    positive for COVID-19 or have had an exposure that requires
                    testing and/or quarantine must not attend class. The
                    University will provide information to the instructor, in a
                    manner that complies with privacy laws, about students in
                    these latter categories. These students are judged to have
                    excused absences for the class period and should contact the
                    instructor via email about making up the work. Students who
                    fail to abide by these rules will first be asked to comply;
                    if they refuse, they will be required to leave the classroom
                    immediately. If a student is asked to leave the classroom,
                    the non-compliant student will be judged to have an
                    unexcused absence and reported to the Office for Student
                    Conflict Resolution for disciplinary action. Accumulation of
                    non-compliance complaints against a student may result in
                    dismissal from the University.
                  </p>

                  <p className={styles.text}>
                    <span className="color-dark-gray w-600">
                      Face Coverings
                    </span>{" "}
                    - All students, faculty, staff, and visitors are required to
                    wear face coverings in classrooms and university spaces.
                    This is in accordance with CDC guidance and University
                    policy and expected in this class. Please refer to the
                    University of Illinois Urbana-Champaign's COVID-19 website
                    for further information on face coverings. Thank you for
                    respecting all of our well-being so we can learn and
                    interact together productively.{" "}
                  </p>
                  <p className={styles.text}>
                    <span className="color-dark-gray w-600">
                      Building Access
                    </span>{" "}
                    - In order to implement COVID-19-related guidelines and
                    policies affecting university operations, instructional
                    faculty members may ask students in the classroom to show
                    their Building Access Status in the Safer Illinois app or
                    the Boarding Pass. Staff members may ask students in
                    university offices to show their Building Access Status in
                    the Safer Illinois app or the Boarding Pass. If the Building
                    Access Status says "Granted," that means the individual is
                    compliant with the university's COVID-19 policies—either
                    with a university-approved COVID-19 vaccine or with the
                    on-campus COVID-19 testing program for unvaccinated
                    students. Students are required to show only the Building
                    Access Screen, which shows compliance without specifying
                    whether it was through COVID-19 vaccination or regular
                    on-campus testing. To protect personal health information,
                    this screen does not say if a person is vaccinated or not.
                    Students are not required to show anyone the screen that
                    displays their vaccination status. No university official,
                    including faculty members, may ask students why they are not
                    vaccinated or any other questions seeking personal health
                    information.
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
                    Remember you can sign up for emergency text messages at
                    http://emergency.illinois.edu/.
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
                    found here: http://wecare.illinois.
                    edu/resources/students/#confidential. Other information
                    about resources and reporting is available here:
                    http://wecare.illinois.edu.
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
                http://counselingcenter.illinois.edu/about-us/embedded-counselors
              </p>
            </div>

            <div className={styles.resourceItem}>
              <h4>McKinley Health Center</h4>
              <span className={styles.phoneNumber}>217-333-2700</span>
              <span className={styles.address}>
                1109 South Lincoln Avenue, Urbana, IL
              </span>
            </div>
          </Col>

          <Col lg={6}>
            <div className={styles.resourceItem}>
              <h4>Disability Resources &amp; Educational Services (DRES)</h4>
              <span className={styles.phoneNumber}>217-333-1970</span>
              <span className={styles.address}>
                1207 S Oak St, Champaign, IL
              </span>
            </div>

            <div className={styles.resourceItem}>
              <h4>Kognito</h4>

              <p>
                Kognito teaches skills to recognize distress in others, talk to
                them about it, and connect them to resources that can help.
                Kognito offers modules specific to concerns of LGBTQ individuals
                and student veterans. Having conversations about suicide can be
                difficult, but it is important to have them. If you are unsure
                where to begin, practice at http://ui.kognito.com
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
