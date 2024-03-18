import { useMemo } from 'react';
import { MantineReactTable } from 'mantine-react-table';

const Test = () => {
  const columns = useMemo(
    () => [
        { accessorKey: 'team', header: "Team"}, 
        {accessorKey: "ampNotes", header: "Amp Notes Avg"},
        {accessorKey: "speakerNotes", header: "Speaker Notes Avg"}, 
        {accessorKey: 'autoPoints', header: "Auto Pts Avg"}, 
        {accessorKey: 'teleopPoints', header: "Teleop Pts Avg"},
        {accessorKey: 'endgamePoints',header: "Endgame Pts Avg" },
        {accessorKey: 'pointsScored', header:"Avg Total Pt Contribution"}, 
        {accessorKey: 'driverRating', header: "Driver Rating"}, 
        {accessorKey: 'defenseRating', header: "Defense Rating"}, 
        {accessorKey: 'intakeRating', header: "Intake Rating"},  
        {accessorKey: 'climbRating', header: "Climb Rating"}
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={[]}
      state={{ isLoading: true }}
    />
  );
};

export default Test;