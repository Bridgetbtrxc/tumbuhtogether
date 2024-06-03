<?php

namespace App\Enums;

enum TransactionType: string
{
    case Donation = "donation";
    case UserDonation = "user_donation";
}
