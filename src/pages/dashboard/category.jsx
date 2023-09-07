import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    alert,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function Category() {


    return(
        <div>
            <Card>
            <Typography variant="h6" color="black"
            style={{
                color: "black",
                fontSize: "22px",
                fontWeight: "bold",
            }}>
                文学
            </Typography>

            <Typography>
                小说
            </Typography>

            </Card>
        </div>
    )
}
export default Category;