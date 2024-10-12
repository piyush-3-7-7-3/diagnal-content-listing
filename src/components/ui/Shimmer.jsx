import Grid from '@mui/material/Grid2';
import { Skeleton } from "@mui/material";

const Shimmer = () => {
    return (// Render skeletons while loading
        <Grid container spacing={2} marginX={5} justifyContent="center" alignItems="flex-start">
            {Array.from(new Array(12)).map((_, index) => (
                <Grid xs={4} key={index}>
                    <Skeleton
                        sx={{ bgcolor: 'grey.800' }}
                        variant="rectangular"
                        width={150}
                        height={200}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default Shimmer;