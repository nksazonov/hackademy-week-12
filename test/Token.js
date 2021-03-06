const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

describe("Token contract", function () {
  before(async function () {
    this.Token = await ethers.getContractFactory('Token');
  });

  beforeEach(async function () {
    this.hardhatToken = await upgrades.deployProxy(this.Token);
    await this.hardhatToken.deployed();
  });

  it("Deployment should assign 1000 tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const ownerBalance = await this.hardhatToken.balanceOf(owner.address);
    expect(1000).to.equal(ownerBalance);
  });

  it("Token price", async function () {
    expect(5000000).to.equal(await this.hardhatToken.tokenPrice());
  });

  // it("owh contract balance checking", async function () {
  //   const [owner] = await ethers.getSigners();
  //   expect(0).to.equal(await this.hardhatToken.owhBalanceOf(owner.address));
  // });

  it("Buy tokens", async function () {
    const [owner] = await ethers.getSigners();

    await owner.sendTransaction({
      to: this.hardhatToken.address,
      value: ethers.utils.parseEther("0.001")
    });

    expect(6000).to.equal(await this.hardhatToken.totalSupply());
  });
});