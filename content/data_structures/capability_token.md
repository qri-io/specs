---
title: Capability Tokens (UCANs)
description: qri's PKI scheme
---

A _Capability Token_ is a verifiable data structure that grants a _capability_ from one key to another. The granting key is termed the _issuer_, signs a _payload_ that contains the public key of the _audience_, a key receiving the granted rights.

Capability Tokens follow the definition of a _UCAN_ token (“User Controlled Authorization Network” token) as defined in the [fission whitepaper](https://whitepaper.fission.codes/access-control/ucan/jwt-authentication). UCAN tokens MUST be serializable as _JSON Web Tokens_ [(JWT)](https://jwt.io).  Implementations MUST implement the UCAN spec, but may choose to store and exchange Capability Tokens in protobuf format.

```protobuf:title=Token
syntax = "proto3";

message CapabilityToken {
  required Header    header  = 1;      // Token Metadata
  required Payload   payload = 2;      // Authorization Information
  required Signature bytes   = 3;      // Token Authentication
}

message Header {
  required KeyType   Zlg      = 1; // string: "alg"
  required string    Zype     = 2; // string: "typ"
  required string    ZcanVer  = 3; // string: "ucv"  Semver("m.n.p")
}

message Payload {
  required DIDString     issuer      = 1;
  required DIDString     audience    = 2;

  required UTCTime       expires     = 3;
  optional UTCTime       notBefore   = 4;

  repeated string        proof       = 5;
  repeated Attenuation   attenuation = 6;
  repeated Fact          fact        = 7;
}

message DIDString string;
message UTCTime string;

message Attenuation {
  required Type       string = 1;
  required Capability bytes  = 2;
  // additional optional fields elided
}

message Fact {

}
```

### UCAN JWTs

Capability tokens must be serializable to UCAN tokens. Recall that UCAN tokens are just JSON Web Tokens with special fields. Here's an example serialized UCAN:

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInVjdiI6IjAuNC4wIn0.eyJpc3MiOiJkaWQ6a2V5Ok1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBb2FkUjRtY1U3QzBBbWg1bHRfM0hObVEyYVlDOEotYU5mNTJUNEtrLTBzbHh6LVc1LXhrREJ0NUR4RUZuSmVKNGJTMV9ZWkt3UkxKQjYzU0phcWZjMXhUTUFYMnJmcW44d3NwUmd2MEFReGU4RV9icGkzZTUyNnU2UU1VRjdYbDRKN2JkbVlZT0lCUDVCSk83eU1pX2pfU3FWaVdmOG82Y3BJTEF3dXpUNTY2X0ttUWFOclM5QmVNUHQ5NTJZUk1lejZlMFoycXR0aVRQS3hmalJ3b0VwRklldDVhZTFZY0p2VDBLQnJiZEYwNXhDc2F6RUoxSm52eUlSamNiUE9FYVljUjNPZnAxdW8ySTRKdVczQ2FKeHNqMU8yNnZyLWRUSzlqcGVFVTl5X1dUU1lNOUVsazBwZ0xZZ1M4ZHE4aTYwNDVnejByemU4QzV2YkZoSFZwa1ZRSURBUUFCIiwic3ViIjoiZGlkOmtleTpNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQW9hZFI0bWNVN0MwQW1oNWx0XzNITm1RMmFZQzhKLWFOZjUyVDRLay0wc2x4ei1XNS14a0RCdDVEeEVGbkplSjRiUzFfWVpLd1JMSkI2M1NKYXFmYzF4VE1BWDJyZnFuOHdzcFJndjBBUXhlOEVfYnBpM2U1MjZ1NlFNVUY3WGw0SjdiZG1ZWU9JQlA1QkpPN3lNaV9qX1NxVmlXZjhvNmNwSUxBd3V6VDU2Nl9LbVFhTnJTOUJlTVB0OTUyWVJNZXo2ZTBaMnF0dGlUUEt4ZmpSd29FcEZJZXQ1YWUxWWNKdlQwS0JyYmRGMDV4Q3NhekVKMUpudnlJUmpjYlBPRWFZY1IzT2ZwMXVvMkk0SnVXM0NhSnhzajFPMjZ2ci1kVEs5anBlRVU5eV9XVFNZTTlFbGswcGdMWWdTOGRxOGk2MDQ1Z3owcnplOEM1dmJGaEhWcGtWUUlEQVFBQiIsImF0dCI6W3siYXBpIjoiKiIsImNhcCI6IlNVUEVSX1VTRVIifSx7ImNhcCI6IlNVUEVSX1VTRVIiLCJkYXRhc2V0IjoiYjU6d29ybGRfYmFua19wb3B1bGF0aW9uOioifV19.Z32-i-pGAtPRsG0JW4ZS8-c17x3mX3kFrmZ0BYhyWk2JH4QMwXFRtkUl8xVQtrC3JigeQeaDiz-WTUSFqJIs5dunL1Xf_SXqq8SZ7NCh6u6OEo2L1BnQkwdO8kDsFoiF42byWDBwzHRog0N-pRXgMhlo8si6Pek4KAZokQ5F-8FuLb3MXXxc9-FnhGRsKgGt_bNWS322h5gXCaXJAzbdAHwGSlORCCJI4CrbWUHs03i4viun2Ht01JO-p4ySlut6YyQ_vW4NGNSAAXGeR-ggkB0B6TGgt695CxX1zgQKV7X6JZx-NF_J-OXCIWngCfr6VdRv1_ADce9s1ODEm2N7eA
```

_paste the above output into the debugger at [jwt.io](https://jwt.io) for additional details_

The above token has the following header and payload:

```json:title=UCAN_header
{
  "alg": "RS256",
  "typ": "JWT",
  "ucv": "0.4.0"
}
```

```json:title=UCAN_payload
{
  "iss": "did:key:MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoadR4mcU7C0Amh5lt_3HNmQ2aYC8J-aNf52T4Kk-0slxz-W5-xkDBt5DxEFnJeJ4bS1_YZKwRLJB63SJaqfc1xTMAX2rfqn8wspRgv0AQxe8E_bpi3e526u6QMUF7Xl4J7bdmYYOIBP5BJO7yMi_j_SqViWf8o6cpILAwuzT566_KmQaNrS9BeMPt952YRMez6e0Z2qttiTPKxfjRwoEpFIet5ae1YcJvT0KBrbdF05xCsazEJ1JnvyIRjcbPOEaYcR3Ofp1uo2I4JuW3CaJxsj1O26vr-dTK9jpeEU9y_WTSYM9Elk0pgLYgS8dq8i6045gz0rze8C5vbFhHVpkVQIDAQAB",
  "sub": "did:key:MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoadR4mcU7C0Amh5lt_3HNmQ2aYC8J-aNf52T4Kk-0slxz-W5-xkDBt5DxEFnJeJ4bS1_YZKwRLJB63SJaqfc1xTMAX2rfqn8wspRgv0AQxe8E_bpi3e526u6QMUF7Xl4J7bdmYYOIBP5BJO7yMi_j_SqViWf8o6cpILAwuzT566_KmQaNrS9BeMPt952YRMez6e0Z2qttiTPKxfjRwoEpFIet5ae1YcJvT0KBrbdF05xCsazEJ1JnvyIRjcbPOEaYcR3Ofp1uo2I4JuW3CaJxsj1O26vr-dTK9jpeEU9y_WTSYM9Elk0pgLYgS8dq8i6045gz0rze8C5vbFhHVpkVQIDAQAB",
  "att": [
    {
      "api": "*",
      "cap": "SUPER_USER"
    },
    {
      "cap": "SUPER_USER",
      "dataset": "b5:world_bank_population:*"
    }
  ]
}
```