import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

import colors from "assets/colors";
import devices from "assets/devices";

import Category from "data/Category";
import PetitionData, { PetitionStatus } from "data/PetitionData";

import "../assets/styles/PetitionList.scss";

interface PetitionListProps {
  title: String;
  perPage: number;
  categoryFilter: Category | null;
  statusFilter?: PetitionStatus;
  preprocess?: (p: PetitionData[]) => PetitionData[];
  petitionData: PetitionData[];
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  margin-bottom: 4rem;
`;

const Title = styled.h1`
  margin: 1.5rem 0;
  font-size: 1.4rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  border-top: 2px solid black;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #d9d9d9;
`;

const TableHeader = styled.th`
  font-size: 1.2rem;
  padding: 1rem 0;

  &:nth-child(1) {
    width: 120px;
  }

  &:nth-child(3),
  &:nth-child(4) {
    width: 100px;
  }

  @media ${devices.tablet} {
    &:nth-child(1),
    &:nth-child(3) {
      display: none;
    }
  }
`;

const TableCell = styled.td`
  font-size: 1.2rem;
  text-align: center;

  padding: 1rem 0;

  @media ${devices.tablet} {
    &:nth-child(1),
    &:nth-child(3) {
      display: none;
    }
  }
`;

const PetitionLink = styled(Link)`
  text-decoration: none;
  color: ${colors.textMain};
`;

function PetitionList({
  title,
  perPage,
  categoryFilter,
  statusFilter,
  preprocess,
  petitionData,
}: PetitionListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  let data = petitionData;
  if (categoryFilter !== null) {
    data = data.filter((item) => item.category === categoryFilter);
  }

  if (statusFilter) {
    data = data.filter((item) => item.status === statusFilter);
  }

  if (preprocess) {
    data = preprocess(data);
  }

  const pageCount = Math.ceil(data.length / perPage);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => setCurrentPage(0), [categoryFilter]);

  return (
    <Container>
      <Title>{title}</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>분류</TableHeader>
            <TableHeader>제목</TableHeader>
            <TableHeader>청원일</TableHeader>
            <TableHeader>참여 인원</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data
            .slice(currentPage * perPage, (currentPage + 1) * perPage)
            .map(({ id, category, title, createdAt, likes }, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: colors.main }}>{category}</TableCell>
                <TableCell>
                  <PetitionLink to={"/petition/" + id}>{title}</PetitionLink>
                </TableCell>
                <TableCell>{createdAt.format("YY.MM.DD")}</TableCell>
                <TableCell style={{ color: colors.main }}>{likes}명</TableCell>
              </TableRow>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        containerClassName="pagination"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        previousLabel="< PREV"
        nextLabel="NEXT >"
      />
    </Container>
  );
}

PetitionList.defaultProps = {
  categoryFilter: null,
};

export default PetitionList;
