// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TrustVerseAnchor
 * @dev Privacy-preserving credential anchor contract on Polygon Amoy Testnet.
 * Stores minimal salted Merkle Roots and issuer revocation statuses.
 * NEVER stores raw document certificates or personal identity payloads.
 */
contract TrustVerseAnchor {

    address public owner;

    struct CredentialAnchor {
        bytes32 merkleRoot;
        string issuerDID;
        uint256 timestamp;
        bool revoked;
        string revocationReason;
        bytes pqcSig;
    }

    struct IssuerProfile {
        string did;
        string name;
        address wallet;
        bool isActive;
    }

    mapping(bytes32 => CredentialAnchor) public credentials;
    mapping(string => IssuerProfile) public issuers;

    event IssuerRegistered(string indexed did, string name, address indexed wallet);
    event CredentialAnchored(bytes32 indexed credentialHash, bytes32 merkleRoot, string issuerDID, uint256 timestamp);
    event CredentialRevoked(bytes32 indexed credentialHash, string reason, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can execute");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerIssuer(string memory did, string memory name, address wallet) external {
        issuers[did] = IssuerProfile(did, name, wallet, true);
        emit IssuerRegistered(did, name, wallet);
    }

    function anchorCredential(
        bytes32 credentialHash,
        bytes32 merkleRoot,
        string memory issuerDID,
        bytes memory pqcSig
    ) external {
        require(credentials[credentialHash].timestamp == 0, "Credential already anchored");

        credentials[credentialHash] = CredentialAnchor({
            merkleRoot: merkleRoot,
            issuerDID: issuerDID,
            timestamp: block.timestamp,
            revoked: false,
            revocationReason: "",
            pqcSig: pqcSig
        });

        emit CredentialAnchored(credentialHash, merkleRoot, issuerDID, block.timestamp);
    }

    function revokeCredential(bytes32 credentialHash, string memory reason) external {
        require(credentials[credentialHash].timestamp > 0, "Credential does not exist");
        require(!credentials[credentialHash].revoked, "Credential already revoked");

        credentials[credentialHash].revoked = true;
        credentials[credentialHash].revocationReason = reason;

        emit CredentialRevoked(credentialHash, reason, block.timestamp);
    }

    function isCredentialValid(bytes32 credentialHash) external view returns (bool isValid, bool isRevoked) {
        CredentialAnchor memory anchor = credentials[credentialHash];
        if (anchor.timestamp == 0) {
            return (false, false);
        }
        return (!anchor.revoked, anchor.revoked);
    }

    function getCredential(bytes32 credentialHash) external view returns (
        bytes32 merkleRoot,
        string memory issuerDID,
        uint256 timestamp,
        bool revoked,
        string memory revocationReason
    ) {
        CredentialAnchor memory anchor = credentials[credentialHash];
        require(anchor.timestamp > 0, "Credential not found");
        return (
            anchor.merkleRoot,
            anchor.issuerDID,
            anchor.timestamp,
            anchor.revoked,
            anchor.revocationReason
        );
    }
}
