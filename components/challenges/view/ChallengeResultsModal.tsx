import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useChallengeResults from "hooks/useChallengeResults";
import { IChallengeTypeAndId } from "types/challenge";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";
import { getChallengeTypeDisplayName } from "utils/challenge";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const modalBoxStyle = {
  position: "absolute",
  top: "5%",
  right: "5%",
  bottom: "5%",
  left: "5%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

interface IChallengeResultsModalProps {
  challenges: IChallengeTypeAndId[];
  userId: string;
  isOpen: boolean;
  handleClose: () => void;
}

export default function ChallengeResultsModal({
  challenges = [],
  userId,
  isOpen,
  handleClose,
}: IChallengeResultsModalProps) {
  const { data: challengeResults } = useChallengeResults(challenges, userId);

  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label="Challenge Attempts Summary"
              sx={{ fontSize: "0.92rem" }}
              color="secondary"
            />

            <Button
              variant="outlined"
              onClick={handleClose}
              endIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Box>

          <TableContainer>
            <Table className="left">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Success Count</TableCell>
                  <TableCell>Fail Count</TableCell>
                  <TableCell>Total Count</TableCell>
                  <TableCell>First Success</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {challengeResults?.map((o) => (
                  <TableRow key={`${o.challenge_type}_${o.challenge_id}`}>
                    <TableCell>{o.challenge_id}</TableCell>
                    <TableCell>
                      {getChallengeTypeDisplayName(o.challenge_type)}
                    </TableCell>
                    <TableCell>{o.challenge_title}</TableCell>
                    <TableCell>{o.success_count}</TableCell>
                    <TableCell>{o.fail_count}</TableCell>
                    <TableCell>{o.total_count}</TableCell>
                    <TableCell>
                      {o.first_success &&
                        dayjs(o.first_success).format("YYYY-MM-DD hh:mm a")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {!challengeResults && (
            <Box
              sx={{
                marginTop: 6,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}
