// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.0/utils/Counters.sol";


contract WeatherNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct WeatherData {
        int256 temperature;
        uint256 humidity;
        uint256 windSpeed;
        string weatherImage;
        uint256 timestamp;
    }

    mapping(uint256 => WeatherData[]) private weatherHistory;

    mapping(uint256 => string) private tokenURIs;

    enum Period { Today, LastWeek, LastMonth }

    event WeatherNFTMinted(uint256 indexed tokenId, address owner, WeatherData data);

    event WeatherNFTUpdated(uint256 indexed tokenId, WeatherData data);

    constructor() ERC721("WeatherNFT", "WNFT") {}

    function mintWeatherNFT() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        WeatherData memory data = _generateFakeWeatherData();
        weatherHistory[newItemId].push(data);

        emit WeatherNFTMinted(newItemId, msg.sender, data);
    }

    function updateWeatherData(uint256 tokenId) public {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Caller is not owner");

        WeatherData memory data = _generateFakeWeatherData();
        weatherHistory[tokenId].push(data);

        emit WeatherNFTUpdated(tokenId, data);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Caller is not owner");

        tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenURIs[tokenId];
    }

    function getWeatherData(uint256 tokenId, Period period) public view returns (WeatherData[] memory) {
        require(_exists(tokenId), "Token does not exist");

        WeatherData[] storage history = weatherHistory[tokenId];
        uint256 currentTime = block.timestamp;
        uint256 periodTime;

        if (period == Period.Today) {
            periodTime = 1 days;
        } else if (period == Period.LastWeek) {
            periodTime = 7 days;
        } else if (period == Period.LastMonth) {
            periodTime = 30 days;
        } else {
            revert("Invalid period");
        }

        uint256 count = 0;
        for (uint256 i = 0; i < history.length; i++) {
            if (currentTime - history[i].timestamp <= periodTime) {
                count++;
            }
        }

        WeatherData[] memory dataInPeriod = new WeatherData[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < history.length; i++) {
            if (currentTime - history[i].timestamp <= periodTime) {
                dataInPeriod[index] = history[i];
                index++;
            }
        }
        return dataInPeriod;
    }

    function _generateFakeWeatherData() internal view returns (WeatherData memory) {
        int256 temp = int256(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 80) - 30; 
        uint256 humidity = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        uint256 windSpeed = uint256(keccak256(abi.encodePacked(block.prevrandao, msg.sender))) % 150;
        string memory image = "https://example.com/weather.png"; 
        return WeatherData(temp, humidity, windSpeed, image, block.timestamp);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getWeatherHistory(uint256 tokenId) public view returns (WeatherData[] memory) {
        require(_exists(tokenId), "Token does not exist");
        return weatherHistory[tokenId];
    }
}
